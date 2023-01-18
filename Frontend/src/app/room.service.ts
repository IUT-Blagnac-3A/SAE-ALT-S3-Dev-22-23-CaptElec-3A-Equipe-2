import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {}

  public getRooms(): Observable<Room[]>{
    return this.http.get<any>('http://localhost:3000/data');
  }

}
