import { Component, OnInit } from '@angular/core';
import { ViewService } from '../view.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  viewService!: ViewService;

  constructor(private viewServ: ViewService){}

  ngOnInit(): void {
    this.viewService = this.viewServ;
  }

  public changeView(viewName: string) {
    this.viewService.resetDashboardId();
    let b = false;
    if (viewName === "Dashboard") b = true;
    this.viewService.setView(viewName, b);
  }

}
