import { Component } from "@angular/core";
import { ViewService } from "./view.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  viewService!: ViewService;

  constructor(private viewServ: ViewService) {}

  async ngOnInit() {
    this.viewService = this.viewServ;
  }
}
