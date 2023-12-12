import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent implements OnInit {
  buildingData = {
    id: '',
    name: '',
    localizationoncampus: '',
    floors: 0,
    lifts: 0,
    maxCel: [0, 0]
  };

  selectedBuildingId: string = '';
  buildings: Building[] = [];

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private buildingService: BuildingService) {}

  ngOnInit() {
    this.getBuildings();
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

  updateBuilding() {
    // Clear previous messages
    this.errorMessage = null;
    this.successMessage = null;

    // Validation checks
    if (!this.buildingData.name.trim()) {
      this.errorMessage = 'Name cannot be empty.';
      return;
    }

    if (this.buildingData.floors < 1) {
      this.errorMessage = 'Floors must be 1 or more.';
      return;
    }

    if (this.buildingData.lifts < 0) {
      this.errorMessage = 'Lifts cannot be less than 0.';
      return;
    }

    // If all validations pass, proceed with the update
    this.buildingData.id = this.selectedBuildingId;
    this.buildingService.updateBuilding(this.buildingData).subscribe(
      response => {
        console.log('Building updated:', response);
        this.successMessage = 'Building updated successfully!';
      },
      error => {
        console.error('Error updating building:', error);
        this.errorMessage = 'Error updating building. Please try again.';
      }
    );
  }

  displayPreviousInfo() {
    if (this.selectedBuildingId && this.buildings.length > 0) {
      const selectedBuilding = this.buildings.find(building => building._id === this.selectedBuildingId);

      if (selectedBuilding) {
        this.buildingData = {
          id: selectedBuilding._id,
          name: selectedBuilding.name,
          localizationoncampus: selectedBuilding.localizationoncampus,
          floors: selectedBuilding.floors,
          lifts: selectedBuilding.lifts,
          maxCel: [...selectedBuilding.maxCel]
        };
      }
    }
  }



  addMaxCel() {
    this.buildingData.maxCel.push(0);
  }

  removeMaxCel(index: number) {
    this.buildingData.maxCel.splice(index, 1);
  }
}
