import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';
import { FloorService } from 'src/app/service/Floor/floor.service';

@Component({
  selector: 'app-list-passage-2-buildings',
  templateUrl: './list-2-Buildings-Passage.component.html',
  styleUrls: ['./list-2-Buildings-Passage.component.css']
})
export class ListPassageBetween2BuildingsComponent implements OnInit {
  selectedBuildingID1: string = '';
  selectedBuildingID2: string = '';

  FloorsFromBuilding1 : Floor [] = [];
  FloorsFromBuilding2 : Floor [] = [];
  buildings : Building [] = [];
  
  constructor(
    private buildingService: BuildingService,
    private floorService: FloorService,
    ) {}
  
  ngOnInit(): void {
    this.getBuildings();
      
  }

  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building []) => {
        this.buildings = buildings;
      },
      (error: any)=> {
        console.error ('Error fetching buildings',error);
      }

    );
  }

  ListPassageBetween2Buildings() {  
    if (this.selectedBuildingID1 && this.selectedBuildingID2) {
      const building1 = this.buildings.find(building => building._id === this.selectedBuildingID1);
      const building2 = this.buildings.find(building => building._id === this.selectedBuildingID2);
  
      if (building1 && building2) {
        this.floorService.ListFloorsFromBuildingComponent(this.selectedBuildingID1)
          .subscribe(
            (floorsBuilding1: Floor[]) => {
              this.FloorsFromBuilding1 = floorsBuilding1;
                this.FloorsFromBuilding1.forEach(floor1 => {
                const passageInfo = this.checkPassage(floor1, this.FloorsFromBuilding2);
                if (passageInfo) {
                  console.log(`Passage found from ${building1.name}, floor ${floor1.name} to ${building2.name}, floor ${passageInfo.floor.name}`);
                }
              });
            },
            error => {
              console.error('Error fetching floors from building 1', error);
            }
          );
  
        this.floorService.ListFloorsFromBuildingComponent(this.selectedBuildingID2)
          .subscribe(
            (floorsBuilding2: Floor[]) => {
              this.FloorsFromBuilding2 = floorsBuilding2;
            },
            error => {
              console.error('Error fetching floors from building 2', error);
            }
          );
      }
    }
  }
  
  checkPassage(floor: Floor, floorsToCheck: Floor[]): { floor: Floor, hasPassage: boolean } | null {
    for (const floorToCheck of floorsToCheck) {
      if (floor.passages.some(passage => passage._id === floorToCheck._id)) {
        return { floor: floorToCheck, hasPassage: true };
      }
    }
    return null;
  }
}