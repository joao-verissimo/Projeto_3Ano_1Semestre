import { Component } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service'

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent {
  buildingData = {
    name: '',
    localizationoncampus: '',
    floors: 0,
    lifts: 0,
    maxCel: [0,0] // Start with one default value or empty array
  };

  constructor(private buildingService: BuildingService) {}

  createBuilding() {
    this.buildingService.createBuilding(this.buildingData).subscribe(
      response => console.log('Building created:', response),
      error => console.error('Error:', error)
    );
  }

  addMaxCel() {
    this.buildingData.maxCel.push(0); // Add a new cell with a default value
  }

  removeMaxCel(index: number) {
    this.buildingData.maxCel.splice(index, 1); // Remove the cell at the given index
  }
}
