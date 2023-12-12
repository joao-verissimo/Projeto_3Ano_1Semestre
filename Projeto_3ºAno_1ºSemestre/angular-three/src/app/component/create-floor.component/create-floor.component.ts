import { Component, OnInit } from '@angular/core';
import { FloorService } from '../../service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit {

  floorData = {
    building: '',
    name: '',
    description: '',
    hall: '',
    room: 0,
    floorMap: '',
    hasElevator: false,
    passages: []
  };

  buildings: Building[] = [];
  isFormReadyToSubmit: boolean = false;
  uploadedFileName: string | undefined;
  errorMessage: string |null= null;
  successMessage: string|null= null;

  constructor(
    private floorService: FloorService, 
    private buildingService: BuildingService) {}

  ngOnInit() {
    this.getBuildings();
  }

  createFloor() {
    this.errorMessage = null;
    this.successMessage = null;

    // Validation checks
    if (!this.floorData.name.trim()) {
      this.errorMessage = 'Name cannot be empty.';
      return;
    }

    if (!this.floorData.hall.trim()) {
      this.errorMessage = 'Must insert the floor hall.';
      return;
    }

    if (this.floorData.room < 0) {
      this.errorMessage = 'Floor must have at least 1 room.';
      return;
    }
    


    this.floorService.createFloor(this.floorData).subscribe(
      response => {
        console.log('Floor Created:', response);
        this.successMessage = 'Floor Created successfully!';
      },
      error => {
        console.error('Error creating floor:', error);
        this.errorMessage = 'Error Creating Floor. Please try again.';
      });
  }

  handleUploadSuccess(filename: string) {
    this.floorData.floorMap = filename;
    this.isFormReadyToSubmit = true;
  }
  
  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        this.buildings = buildings;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }
}