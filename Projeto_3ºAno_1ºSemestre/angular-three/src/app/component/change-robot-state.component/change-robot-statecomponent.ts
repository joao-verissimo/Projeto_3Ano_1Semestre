import { Component, Output,NgModule } from '@angular/core';
import Robot from 'src/app/model/robot';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';


@Component({
  selector: 'app-change-robot-state',
  templateUrl: './change-robot-state.component.html',
  styleUrls: ['./change-robot-state.component.css']
})
export class ChangeRobotStateComponent {
  @Output() finalMessage: string = '';
   id = 0;
  constructor(
    private robotService: RobotService,
    private messageService: MessageService
  ) { }
  changeRobotState() {
    this.robotService.changerobotState(this.id).subscribe(
      (data: any) => { 
        const robotresponse = data as Robot;  // Type assertion
        this.messageService.add(`Robot State changed with success! Robot Details: ID :${robotresponse.id} STATE : ${robotresponse.isActive}`);
      },
      
      (error: any) => {
        this.messageService.add("ID Invalid / Non Existent");
        this.finalMessage = error.error.message;
      }
    );
  }

}

export class ActivateRobotModule { }

