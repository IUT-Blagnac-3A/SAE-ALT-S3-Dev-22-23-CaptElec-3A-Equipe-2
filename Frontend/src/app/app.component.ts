import { Component } from "@angular/core";

import SVGService from "./modules/SVG";

// import SVG from "src/modules/SVG";

import File from "./modules/File";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  svgFiles: File[] = [];

  constructor(private svgService: SVGService) {}

  ngOnInit() {
    this.svgService
      .getSVGFromClientProject("Rémy", "Boulle", "0acf456wf", "BLAGNAC-IUT")
      .forEach((value: File, index: number, array: File[]) => {
        this.svgFiles = array;
        // display svg files on the page
        this.svgService.displaySVGsOnPage(this.svgFiles, "svg-container");
      });
  }
}
