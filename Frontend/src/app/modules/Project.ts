import SVGFile from "./SVGFile";
import SVGService, { SVGData } from "./SVG";
import { ViewService } from "../view.service";
import DefineEnvironnementType from "./type.environnement";
import Legend from "./Legend";

const types = ["activity", "co2", "humidity", "pressure", "temperature"];
const typesEmote = ["🏃", "🌬", "💧", "🗜️", "🌡"];

/**
 * @author EricP
 */
export default class Project {
  name: string;
  svgArray: SVGFile[] = [];
  svgService: SVGService;
  viewService: ViewService;
  svgArrayWithDepth: Array<SVGFile[]> = [];
  currentDepth: number = 0;
  currentIndex: number = 0;
  maxDepth: number = 0;
  values: SVGData[] | undefined;
  currentTypeSearched = "temperature";
  history: Array<{ depth: number; index: number }> = [];

  constructor(
    name: string,
    svgArray: SVGFile[],
    svgService: SVGService,
    viewServ: ViewService
  ) {
    this.name = name;
    this.svgArray = svgArray;
    this.viewService = viewServ;
    this.svgService = svgService;
    this.maxDepth = this.determineMaxDepth(svgArray);
    this.buildSvgArrayWithDepth();
  }

  set currentType(type: string) {
    if (!types.includes(type)) throw new Error("Type not found");
    this.currentTypeSearched = type;
  }

  displayOnPage(fromComboBox: boolean = false) {
    let container = document.getElementById("svg-container");
    if (container == null) throw new Error("Container not found");
    if (!fromComboBox)
      this.history.push({ depth: this.currentDepth, index: this.currentIndex });

    container.innerHTML = "";
    if (this.currentDepth > 0) this.displayReturnButton();
    this.svgArrayWithDepth[this.currentDepth][
      this.currentIndex
    ].displayOnPage();

    if (this.currentDepth == this.maxDepth) {
      this.colorLastDepth();
      this.displayScaleColor();
      this.launchOnClick();
      this.displayComboBoxWithTypes();
    } else {
      this.launchInteraction();
    }

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
    this.values = roomValues;
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
            let elementClickedBis = event.target as HTMLElement;
            let elementClicked = elementClickedBis.parentElement;
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
    returnButton.style.top = "80px";
    // Style the button size
    returnButton.style.width = "100px";
    returnButton.style.height = "50px";
    // Set the button text
    returnButton.innerHTML = "Retour";
    returnButton.addEventListener("click", () => {
      let dashboard = document.querySelector("app-dashboard .container");
      dashboard?.setAttribute("style", "display: none;");
      console.log("Return button clicked");

      this.currentDepth--;
      this.currentIndex = this.history[this.history.length - 2].index;
      this.history.pop();
      this.displayOnPage();
    });
    container.appendChild(returnButton);
  }

  displayComboBoxWithTypes() {
    let container = document.getElementById("svg-container");
    if (container == null) throw new Error("Container not found");
    let comboBox = document.createElement("select");
    comboBox.setAttribute("id", "type-combo-box");
    comboBox.setAttribute("class", "form-select");
    comboBox.setAttribute("aria-label", "Default select example");
    comboBox.addEventListener("change", (event) => {
      let elementClicked = event.target as HTMLSelectElement;
      let value = elementClicked.value;
      this.currentTypeSearched = value;
      this.displayOnPage(true);
    });
    types.forEach((type) => {
      let option = document.createElement("option");
      option.setAttribute("value", type);
      // upperCase the first letter
      let indexOfType = types.indexOf(type);
      type =
        typesEmote[indexOfType] + type.charAt(0).toUpperCase() + type.slice(1);
      option.innerHTML = type;
      comboBox.appendChild(option);
    });
    // The placeholder is the currentTypeSearched
    comboBox.value = this.currentTypeSearched;
    container.appendChild(comboBox);
  }

  displayScaleColor() {
    let currentType = this.currentTypeSearched;
    let envType = DefineEnvironnementType(currentType);
    let max = envType.max;
    let min = envType.min;
    let colors = envType.rangeColor;
    let legend = new Legend(min, max, colors, envType.unit);
    legend.display();
    this.displayReturnButton();
  }

  launchOnClick() {
    let svgContainer = document.getElementById("svg-container");
    let svgElement = document.querySelector("#svg-container svg");
    let legendContainer = document.querySelector(".legend-container");
    let svgTitle = document.querySelector("#svg-container h3");
    let dashboard = document.querySelector("app-dashboard .container");
    
    if (svgContainer == null) throw new Error("Container not found");
    let svg = svgContainer.querySelector("svg");
    if (svg == null) throw new Error("Svg not found");
    let gs = svg.querySelectorAll("g");
    gs.forEach((group: Node, index: number, parent: NodeList) => {
      if (group instanceof Element) {
        group.addEventListener("click", (event) => {
          this.viewService.setIsDashboardActive(true);
          let elementClickedBis = event.target as HTMLElement;
          let elementClicked = elementClickedBis.parentElement;
          if (elementClicked == null) throw new Error("Element not found");
          let id = elementClicked.getAttribute("id")?.toUpperCase();
          if (id == null) throw new Error("Id not found");
          let device = this.svgService.findDeviceLinkedToRoom(id);

          // Remove the hidden style from the container
          let container = document.getElementsByClassName("container")[0];
          if (container == null) throw new Error("Container not found");
          svgElement?.setAttribute("style", "display: none;");
          legendContainer?.setAttribute("style", "display: none;");
          svgTitle?.setAttribute("style", "display: none;");
          let selectMenu = document.querySelector("#svg-container select");
          selectMenu?.setAttribute("style", "display: none;");
          dashboard?.setAttribute("style", "display: block;");

          // container.setAttribute("style", "display: block;");
          this.viewService.setDashboardId(device as string);
          this.viewService.observableDash$.next(
            this.viewService.getDashboardId()
          );
        });
      }
    });
  }
}
