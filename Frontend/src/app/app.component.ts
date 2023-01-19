import { Component, ViewChild, QueryList, ElementRef } from "@angular/core";

import SVGService from "./modules/SVG";

// import SVG from "src/modules/SVG";

import File from "./modules/File";
import { ViewService } from "./view.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  @ViewChild("svg") svg: ElementRef | null = null;

  svgFiles: File[] = [];
  viewService!: ViewService;

  constructor(private svgService: SVGService, private viewServ: ViewService) {}

  async ngOnInit() {
    this.viewService = this.viewServ;

    let values = await this.svgService.getSVGFromClientProject(
      "Rémy",
      "Boulle",
      "0acf456wf",
      "IUT_BLAGNAC"
    );

    values.forEach((files: File) => {
      files.displayOnPage();
    });
  }

  ngAfterViewInit() {
    let svgContainer = document.getElementById("svg-container");
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          let groups = mutation.addedNodes;
          groups.forEach((group: Node, index: number, parent: NodeList) => {
            if (group instanceof Element && group.tagName === "DIV") {
              let gs = group.querySelectorAll("g");
              gs.forEach((group: Node, index: number, parent: NodeList) => {
                group.addEventListener("mouseenter", (g) => {
                  if (group instanceof Element) {
                    let path = group.querySelector("path");
                    let currentStyle = path?.getAttribute("style");

                    if (currentStyle != null) {
                      path?.setAttribute(
                        "style",
                        currentStyle.replace("fill:none", "fill:red")
                      );
                    }
                  }
                });
                group.addEventListener("mouseleave", (g) => {
                  if (group instanceof Element) {
                    let path = group.querySelector("path");
                    let currentStyle = path?.getAttribute("style");
                    if (currentStyle != null) {
                      path?.setAttribute(
                        "style",
                        currentStyle.replace("fill:red", "fill:none")
                      );
                    }
                  }
                });
              });
            }
          });
        }
      });
    });
    if (!svgContainer) throw new Error("Container not found");
    observer.observe(svgContainer, { childList: true });
  }
}
