import { Component } from '@angular/core';
import { ViewService } from '../view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private viewService: ViewService){

  }

  public changeView(viewName: string){
    this.viewService.setView(viewName);
  }

}
