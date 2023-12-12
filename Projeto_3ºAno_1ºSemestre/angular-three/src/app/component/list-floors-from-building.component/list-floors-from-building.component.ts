import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/app/service/Floor/floor.service';
import Floor from 'src/app/model/floor'; 
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-list-floors-from-building',
  templateUrl: 'list-floors-from-building.component.html',
  styleUrls: ['list-floors-from-building.component.css']
})
export class ListFloorsFromBuildingComponent implements OnInit {
  selectedBuildingId: string = '';
  Floors: Floor[] = [];
  buildings: Building[] = [];

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingService) {}

  ngOnInit() {
    this.getBuildings();
  }

  listFloorsFromBuilding() {
    console.log(this.selectedBuildingId)
    if (!this.selectedBuildingId) {
      console.error('Please select a building.');
      return;
    }

    this.floorService.ListFloorsFromBuildingComponent(this.selectedBuildingId)
      .subscribe(
        (data: Floor[]) => { 
          this.Floors = data;
        },
        error => {
          console.error('Error fetching floors', error);
        }
      );
  }

  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        console.log('Fetched Buildings:', buildings);
        this.buildings = buildings;
      },
      (error: any) => {
        console.error('Error fetching buildings', error);
      }
    );
  }
}
