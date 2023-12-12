import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import robotType from 'src/app/model/robotType';

@Component({
  selector: 'app-robot-add',
  templateUrl: './add-robot.component.html',
  styleUrls: ['./add-robot.component.css']
})
export class AddRobotComponent implements OnInit {
  robot = {
    nickname: '',
    type: '',
    serialNumber: '',
    description: '',
    isActive: true
  };

  selectedTypeId: string = '';
  rt: robotType[] = [];

  constructor(
    private location: Location,
    private robotService: RobotService,
    private messageService: MessageService
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getRobotType();
  }

  getRobotType(): void {
    console.log(this.robotService.listRobotType());
    this.robotService.listRobotType().subscribe(
      (rt1: robotType[]) => {
        this.rt = rt1;
      },
      (error: any) => {
        console.error('Error fetching floors', error);
      }
    );
  }

  addRobot() {
    if(this.selectedTypeId){
      this.robot.type = this.selectedTypeId;
      let errorOrSuccess: any = this.robotService.addRobot(this.robot);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Robot added with success!");
          this.finalMessage = "Robot added with success!";
          this.location.back();
        },
        
        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
