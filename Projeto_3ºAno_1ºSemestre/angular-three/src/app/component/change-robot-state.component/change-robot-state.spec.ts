import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeRobotStateComponent } from './change-robot-statecomponent';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { HttpResponse } from '@angular/common/http';

import Robot from 'src/app/model/robot';
import robotType from 'src/app/model/robotType';

describe('ChangeRobotStateComponent', () => {
  let component: ChangeRobotStateComponent;
  let fixture: ComponentFixture<ChangeRobotStateComponent>;
  let robotServiceSpy: jasmine.SpyObj<RobotService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  

  beforeEach(async () => {
    robotServiceSpy = jasmine.createSpyObj('RobotService', ['changerobotState']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ChangeRobotStateComponent],
      imports: [FormsModule],
      providers: [
        { provide: RobotService, useValue: robotServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRobotStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockrobotType: robotType = {
    _id: "1",
    designation: "Tractor",
    brand: "LG",
    modelRobot: "modelRobot",
    task: 0,
  };

  const mockRobot: Robot = {
    id: '1',
    nickname: 'Test Robot',
    type: mockrobotType,
    serialNumber: '12345',
    description: 'Test Description',
    isActive: true
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set finalMessage to success message on successful robot state change', () => {
    robotServiceSpy.changerobotState.and.returnValue(of(mockRobot));
  
    component.id = Number(mockRobot.id);
  
    component.changeRobotState();
    
    expect(messageServiceSpy.add).toHaveBeenCalledWith(`Robot State changed with success! Robot Details: ID :${mockRobot.id} STATE : ${mockRobot.isActive}`);
  });
  
  
  it('should set finalMessage to error message on failed robot state change', () => {
    const errorMessage = { error: { message: 'Error changing robot state' } };
    robotServiceSpy.changerobotState.and.returnValue(throwError(() => errorMessage));
    component.changeRobotState();
    expect(component.finalMessage).toBe(errorMessage.error.message);
    expect(messageServiceSpy.add).toHaveBeenCalledWith("ID Invalid / Non Existent");
  });
  
});
