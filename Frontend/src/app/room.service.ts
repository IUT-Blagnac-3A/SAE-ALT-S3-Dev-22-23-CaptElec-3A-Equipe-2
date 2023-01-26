import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Room } from "./room";
import { RoomBattery } from "./roomBattery";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient) {}

  public getRoom(roomName: string): Observable<Room[]>{
    return this.http.get<any>('http://localhost:3000/api/data/'+roomName);
  }

  public getRoomBattery(roomName: string): Observable<RoomBattery[]>{
    return this.http.get<any>('http://localhost:3000/api/battery/'+roomName);
  }
}
