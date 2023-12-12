import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import room from 'src/app/model/room';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private roomAPI_URL = 'http://localhost:4000/api/room';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRoom(room: any) {
    console.log(room);
    return this.http.post(`${this.roomAPI_URL}/createRoom`, room)
  }
}