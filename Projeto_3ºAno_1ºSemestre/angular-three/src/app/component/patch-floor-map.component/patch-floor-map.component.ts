import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FloorService } from '../../service/Floor/floor.service'
import { MessageService } from 'src/app/service/message/message.service';
import floor from 'src/app/model/floor';

@Component({
  selector: 'app-patch-floor-map',
  templateUrl: './patch-floor-map.component.html',
  styleUrls: ['./patch-floor-map.component.css']
})

export class PatchFloorMapComponent implements OnInit {
  floor = {
    id: "",
    floorMap: ''
  };

  selectedFloorId: string = '';
  floors: floor[] = [];
  floorMapFile: boolean = false;
  
  constructor(
    private location: Location,
    private floorService: FloorService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getFloors();
  }

  getFloors(): void {
    this.floorService.listFloors().subscribe(
      (floors: floor[]) => {
        this.floors = floors;
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  handleUploadSuccess(filename: string) {
    this.floor.floorMap = filename;
    this.floorMapFile = true;
  }

  editFloorMap() {
    if(this.selectedFloorId && this.floorMapFile){
      this.floor.id = this.selectedFloorId;
      let errorOrSuccess: any = this.floorService.patchFloorMap(this.floor);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Floor map updated with success!");
          this.finalMessage = "Floor map updated with success!";
          this.location.back();
        },
        
        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    }else{
      console.error('Please select a floor and a building.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}