import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { ViewService } from '../view.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements AfterViewInit, OnInit{

  viewService!: ViewService;
  maxTemperature = 21;

  constructor(private roomService: RoomService, private viewServ: ViewService){}

  ngOnInit(): void {
    this.viewService = this.viewServ;
    this.viewServ.observableIssue$.subscribe(() => {
      
      this.roomService.getRoom(this.viewServ.getDashboardId()).subscribe(
        (result: Room[]) => {
          
          let informationNumber = 0;
          for (let i = 0; i < result.length; i++) {
            informationNumber = i;
          }

          //if there is no one in the room and temperature > 21 degrees it changes the state
          if(result[informationNumber].activity === 0 && result[informationNumber].temperature > this.maxTemperature){
            this.viewServ.setHasIssue(true)
          }else{
            this.viewServ.setHasIssue(false)
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    });
  }

  ngAfterViewInit(): void {
    
  }



}
