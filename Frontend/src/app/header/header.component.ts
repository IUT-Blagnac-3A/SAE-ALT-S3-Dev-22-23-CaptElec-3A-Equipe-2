import { Component } from "@angular/core";
import { ViewService } from "../view.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(public viewService: ViewService) {}

  public changeView(viewName: string) {
    this.viewService.resetDashboardId();
    let b = false;
    if (viewName === "Dashboard") b = true;
    this.viewService.setView(viewName, b);
  }
}
