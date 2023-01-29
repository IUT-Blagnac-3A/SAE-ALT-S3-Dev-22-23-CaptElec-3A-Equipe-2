import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Room } from "./room";
import { RoomBattery } from "./roomBattery";
import { SessionService } from "./session.service";
import ENV from "./environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    let token = this.sessionService.reachToken();
    if (token) this.sessionService.loadBackSessionFromToken(token);
  }

  public getRoom(roomName: string): Observable<Room[]> {
    let path = `${
      ENV.SERVER_ADRESS_A
    }/data/${this.sessionService.getProject()}/device/${roomName}`;
    if (roomName === "")
      path = `${
        ENV.SERVER_ADRESS_A
      }/data/${this.sessionService.getProject()}/all`;
    
    return this.http.get<any>(path, {
      headers: {
        Authorization: "Bearer " + this.sessionService.getToken(),
      },
    });
  }

  public getRoomBattery(roomName: string): Observable<RoomBattery[]> {
    // return this.http.get<any>("http://localhost:3000/api/battery/" + roomName);
    let path = `${
      ENV.SERVER_ADRESS_A
    }/battery/${this.sessionService.getProject()}/device/${roomName}`;
    if (roomName === "")
      path = `${
        ENV.SERVER_ADRESS_A
      }/battery/${this.sessionService.getProject()}/all`;

    return this.http.get<any>(path, {
      headers: {
        Authorization: "Bearer " + this.sessionService.getToken(),
      },
    });
  }
}
