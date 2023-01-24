import { Injectable } from "@angular/core";

const views = ["Log", "Dashboard", "Notifications", "Administration", "Projects", "Help", "Create Account"];

@Injectable({
  providedIn: "root",
})
export class ViewService {
  view = "Log";

  constructor() {}

  public setView(viewName: string): void {
    if (!views.includes(viewName)) throw new Error("Invalid view name");
    this.view = viewName;
  }

  public getView(): string {    
    return this.view;
  }
}
