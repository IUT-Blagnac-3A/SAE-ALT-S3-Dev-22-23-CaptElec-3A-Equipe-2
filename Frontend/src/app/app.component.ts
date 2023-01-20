import { Component, ViewChild, QueryList, ElementRef } from "@angular/core";

import SVGService from "./modules/SVG";

import File from "./modules/File";
import { ViewService } from "./view.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  viewService!: ViewService;

  constructor(private svgService: SVGService, private viewServ: ViewService) {}

  ngOnInit() {
    this.viewService = this.viewServ;
  }
}