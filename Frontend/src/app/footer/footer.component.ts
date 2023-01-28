import { Component } from '@angular/core';
import { ViewService } from '../view.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private viewService: ViewService){

  }

  public changeView(viewName: string){
    this.viewService.setView(viewName);
  }

}
