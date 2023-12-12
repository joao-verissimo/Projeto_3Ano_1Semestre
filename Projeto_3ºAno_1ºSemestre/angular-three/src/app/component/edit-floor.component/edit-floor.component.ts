import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FloorService } from '../../service/Floor/floor.service'
import { MessageService } from 'src/app/service/message/message.service';
import floor from 'src/app/model/floor';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.css']
})

export class EditFloorComponent implements OnInit {
  floor = {
    id: "",
    name: '',
    building: "",
    description: '',
    hall: '',
    room: 0,
    floorMap: '',
    hasElevator: false,
    passages: [""]
  };

  selectedFloorId: string = '';
  selectedBuildingId: string = '';
  floors: floor[] = [];
  floorsWS: floor[] = [];
  buildings: Building[] = [];
  floorMapFile: boolean = false;
  
  constructor(
    private location: Location,
    private buildingService: BuildingService,
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

  handleUploadSuccess(filename: string) {
    this.floor.floorMap = filename;
    this.floorMapFile = true;
  }

  getBuilding(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        this.buildings = buildings;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }

  editFloor() {
    if(this.selectedFloorId && this.selectedBuildingId){
      this.floor.id = this.selectedFloorId;
      this.floor.building = this.selectedBuildingId;
      if(!this.floorMapFile){
        this.floor.floorMap = "1";
      }
      let errorOrSuccess: any = this.floorService.editFloor(this.floor);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Floor Updated with success!");
          this.finalMessage = "Floor Updated with success!";
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