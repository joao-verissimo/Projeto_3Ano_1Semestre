import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RoomService } from 'src/app/service/Room/Room.service';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { RoomCategory } from 'src/app/model/room';
import floor from 'src/app/model/floor';

@Component({
  selector: 'app-room-create',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room = {
    floor: "",
    name: "",
    category: RoomCategory.Anfiteatro,
    description: "",
    dimension: [0,0]
  };

  roomCategories = Object.values(RoomCategory);
  floors: floor[] = [];

  constructor(
    private location: Location,
    private RoomService: RoomService,
    private FloorService: FloorService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getFloors();
  }

  getFloors(): void {
    this.FloorService.listFloors().subscribe(
      (floors: floor[]) => {
        console.log('Fetched Floors:', floors);
        this.floors = floors;
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  createRoom() {
    const selectedFloor = this.floors.find(floor => floor._id === this.room.floor);
    if(selectedFloor){
      this.room.floor = selectedFloor._id;
      let errorOrSuccess: any = this.RoomService.createRoom(this.room);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Success room creation!");
          this.finalMessage = "Success room creation!";
          this.location.back();
        },
        
        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    }else{
      console.error('Selected floor does not exist.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
