import { Component } from "@angular/core";

import SVGService from "./modules/SVG";

// import SVG from "src/modules/SVG";

import File from "./modules/File";
import { ViewService } from "./view.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
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

    console.log(values);

    values.forEach((files: File) => {
      files.displayOnPage();
    });
  }
}
