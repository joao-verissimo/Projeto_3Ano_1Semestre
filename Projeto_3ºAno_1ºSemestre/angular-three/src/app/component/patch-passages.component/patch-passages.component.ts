import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FloorService } from '../../service/Floor/floor.service'
import { MessageService } from 'src/app/service/message/message.service';
import floor from 'src/app/model/floor';

@Component({
  selector: 'app-patch-passages',
  templateUrl: './patch-passages.component.html',
  styleUrls: ['./patch-passages.component.css']
})

export class PatchPassagesComponent implements OnInit {
  floor = {
    id: "",
    passages: [""]
  };

  selectedFloorId: string = '';
  floors: floor[] = [];
  floorsWS: floor[] = [];
  
  constructor(
    private location: Location,
    private floorService: FloorService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getFloors();
    setInterval(() => {
      this.getFloorsWithoutSelected();
    }, 1000);
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

  getFloorsWithoutSelected(): void {
    this.floorService.listFloors().subscribe(
      (floors: floor[]) => {
        this.floorsWS = floors.filter(floor => floor._id !== this.selectedFloorId);
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  patchFloorPassages() {
    if(this.selectedFloorId){
      this.floor.id = this.selectedFloorId;
      let errorOrSuccess: any = this.floorService.patchPassages(this.floor);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Floor passages created/updated with success!");
          this.finalMessage = "Floor passages created/updated with success!";
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

  addPassage() {
    this.floor.passages.push("");
  }

  removePassage(index: number) {
    this.floor.passages.splice(index, 1);
  }

  goBack(): void {
    this.location.back();
  }
}