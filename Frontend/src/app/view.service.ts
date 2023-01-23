import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ViewService {
  view = "Dashboard";

  constructor() {}

  public setView(viewName: string): void {
    this.view = viewName;
  }

  public getView(): string {
    return this.view;
  }
}
