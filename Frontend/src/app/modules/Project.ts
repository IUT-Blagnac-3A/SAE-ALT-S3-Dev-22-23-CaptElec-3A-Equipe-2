import SVGFile from "./SVGFile";
import SVGService from "./SVG";

const types = ["activity", "co2", "humidity", "pressure", "temperature"];

/**
 * @author EricP
 */
export default class Project {
  name: string;
  svgArray: SVGFile[] = [];
  svgService: SVGService;
  svgArrayWithDepth: Array<SVGFile[]> = [];
  currentDepth: number = 0;
  currentIndex: number = 0;
  maxDepth: number = 0;
  currentTypeSearched = "temperature";
  history: Array<{ depth: number; index: number }> = [];

  constructor(name: string, svgArray: SVGFile[], svgService: SVGService) {
    this.name = name;
    this.svgArray = svgArray;
    this.svgService = svgService;
    this.maxDepth = this.determineMaxDepth(svgArray);
    this.buildSvgArrayWithDepth();
  }

  set currentType(type: string) {
    if (!types.includes(type)) throw new Error("Type not found");
    this.currentTypeSearched = type;
  }

  displayOnPage() {
    let container = document.getElementById("svg-container");
    if (container == null) throw new Error("Container not found");
    this.history.push({ depth: this.currentDepth, index: this.currentIndex });

    container.innerHTML = "";
    if (this.currentDepth > 0) this.displayReturnButton();
    this.svgArrayWithDepth[this.currentDepth][
      this.currentIndex
    ].displayOnPage();

    if (this.currentDepth == this.maxDepth) this.colorLastDepth();
    this.launchInteraction();

    if (this.currentDepth < this.maxDepth) this.fillAccessibleZones();
    else return;
  }

  goDeeperOnPage(fileName: string) {
    // remove the .svg extension
    fileName = fileName.replace(".svg", "");
    this.currentDepth++;
    this.currentIndex = this.svgArrayWithDepth[this.currentDepth].findIndex(
      (svg) => svg.name === fileName
    );
    this.displayOnPage();
  }

  determineMaxDepth(svgArray: SVGFile[]): number {
    let maxDepth = 0;
    svgArray.forEach((svg) => {
      let receivedDepth = this.getSvgDepth(svg);
      if (receivedDepth > maxDepth) {
        maxDepth = receivedDepth;
      }
    });
    return maxDepth;
  }

  buildSvgArrayWithDepth() {
    let svgArrayWithDepth: Array<SVGFile[]> = [];
    for (let i = 0; i <= this.maxDepth; i++) {
      svgArrayWithDepth.push([]);
    }
    this.svgArray.forEach((svg) => {
      let receivedDepth = this.getSvgDepth(svg);
      svgArrayWithDepth[receivedDepth].push(svg);
    });
    this.svgArrayWithDepth = svgArrayWithDepth;
  }

  getSvgDepth(file: SVGFile): number {
    let content = file.content;
    if (content == null) throw new Error("Content is null");
    let depth = content.match(/class="(\d+)"/);
    if (depth == null) throw new Error("Depth is null");
    return parseInt(depth[1]);
  }

  fillAccessibleZones() {
    let svgContainer = document.getElementById("svg-container");
    if (svgContainer == null) throw new Error("Container not found");
    let svg = svgContainer.querySelector("svg");
    if (svg == null) throw new Error("Svg not found");
    let gs = svg.querySelectorAll("g");
    gs.forEach((group: Node, index: number, parent: NodeList) => {
      if (group instanceof Element) {
        // If the group has a <direction> tag, we need to fill it
        let direction = group.querySelector("direction");
        if (direction != null) {
          let path = group.querySelectorAll("path");
          for (let i = 0; i < path.length; i++) {
            path[i].setAttribute("style", "fill:rgba(186, 0, 0, 0.75)");
          }
        } else {
          let path = group.querySelectorAll("path");
          for (let i = 0; i < path.length; i++) {
            path[i].setAttribute("style", "fill:rgba(0, 121, 130, 0.1)");
          }
        }
      }
    });
  }

  async colorLastDepth() {
    let roomValues = await this.svgService.getRoomsValues(
      this.currentTypeSearched,
      this.name
    );
    this.svgService.fillSVGs(roomValues, this.currentTypeSearched);
  }

  launchInteraction() {
    // If we click on an available zone, we go to the next depth
    let svgContainer = document.getElementById("svg-container");
    if (svgContainer == null) throw new Error("Container not found");
    let svg = svgContainer.querySelector("svg");
    if (svg == null) throw new Error("Svg not found");
    let gs = svg.querySelectorAll("g");
    gs.forEach((group: Node, index: number, parent: NodeList) => {
      if (group instanceof Element) {
        // If the group has a <direction> tag, we need to fill it
        let direction = group.querySelector("direction");
        if (direction != null) {
          group.addEventListener("click", (event) => {
            // @ts-ignore
            let elementClicked = event.path[1];
            if (elementClicked == null) throw new Error("Element not found");
            // Get the direction
            let direction = elementClicked.querySelector("direction");
            if (direction == null) throw new Error("Direction not found");
            let directionValue = direction.innerHTML;
            this.goDeeperOnPage(directionValue);
          });
        }
      }
    });
  }

  displayReturnButton() {
    let container = document.getElementById("svg-container");
    if (container == null) throw new Error("Container not found");
    let returnButton = document.createElement("button");
    // Set attributes
    returnButton.setAttribute("id", "return-button");
    returnButton.setAttribute("class", "btn btn-primary");
    // Put the button at the very right of the container
    returnButton.style.position = "absolute";
    returnButton.style.right = "30PX";
    returnButton.style.top = "60px";
    // Style the button size
    returnButton.style.width = "100px";
    returnButton.style.height = "50px";
    // Set the button text
    returnButton.innerHTML = "Retour";
    returnButton.addEventListener("click", () => {
      this.currentDepth--;
      this.currentIndex = this.history[this.history.length - 2].index;
      this.history.pop();
      this.displayOnPage();
    });
    container.appendChild(returnButton);
  }
}
