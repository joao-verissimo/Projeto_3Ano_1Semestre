import { Component, OnInit, Output } from '@angular/core';
import { LiftService } from '../../service/Lift/lift.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';
import { MessageService } from 'src/app/service/message/message.service';
import Lift from 'src/app/model/lift';


@Component({
  selector: 'app-create-lift',
  templateUrl: './create-lift.component.html',
  styleUrls: ['./create-lift.component.css']
})

export class CreateLiftComponent implements OnInit {
  @Output() finalMessage: string = '';
  liftData = {
    localization: '',
    state: '',
    building: ''
  };

  buildings: Building[] = [];

  constructor(
    private liftService: LiftService, 
    private buildingService: BuildingService,
    private messageService: MessageService
    ) {}
  ngOnInit() {
    this.getBuildings();
  }

  createLift() {
    this.liftService.createLift(this.liftData).subscribe(
      (response : any) => {
        // Assuming 'response' contains the data of the created lift
        const liftResponse = response as Lift;  // Type assertion
        const liftInfo = `Lift created successfully. Details - ID: ${liftResponse.id}, Localization: ${liftResponse.localization}, State: ${liftResponse.state}, Building: ${this.liftData.building}`;
        this.messageService.add(liftInfo);

      },
      error => {
        this.messageService.add('Error creating lift: ' + error.message);
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
