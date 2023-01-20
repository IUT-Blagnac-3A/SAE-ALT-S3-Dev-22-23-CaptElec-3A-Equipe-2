import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Room } from "../room";
import { RoomService } from "../room.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  rooms!: Room[];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.getRooms();
  }

  public getRooms() {
    // this.roomService.getRooms().subscribe(
    //   (response: Room[])=>{
    //     this.rooms = response
    //   },
    //   (error: HttpErrorResponse)=>{
    //     alert(error.message)
    //   }
    // )
  }
}
