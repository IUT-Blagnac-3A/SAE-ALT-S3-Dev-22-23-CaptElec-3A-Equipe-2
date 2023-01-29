import { Component } from "@angular/core";

import { SessionService } from "./session.service";
import { ViewService } from "./view.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  viewService!: ViewService;

  constructor(
    private sessionService: SessionService,
    private viewServ: ViewService
  ) {
    // sessionService.resetSession();
    if (this.sessionService.isThereARunningSession()) {
      let token = this.sessionService.reachToken();
      this.sessionService.loadBackSessionFromToken(token as string);
      viewServ.setView("Dashboard");
    } else {
      viewServ.setView("Log");
    }
  }

  ngOnInit() {
    this.viewService = this.viewServ;
  }
}
