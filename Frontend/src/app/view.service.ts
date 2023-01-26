import { Injectable } from "@angular/core";

const views = [
  "Log",
  "Dashboard",
  "Notifications",
  "Administration",
  "Projects",
  "Help",
  "Create Account",
];

@Injectable({
  providedIn: "root",
})
export class ViewService {
  // view = "Log";
  view = "Dashboard";
  dashboardId = "";

  constructor() {}

  public setView(viewName: string): void {
    if (!views.includes(viewName)) throw new Error("Invalid view name");
    this.view = viewName;
  }

  public getView(): string {
    return this.view;
  }

  public setDashboardId(inputDashboardId: string): void {
    this.dashboardId = inputDashboardId;
  }

  public getDashboardId(): string {
    console.log("Dashboard ID : " + this.dashboardId);

    return this.dashboardId;
  }
}
