import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AddRobotComponent } from './add-robot.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import robotType from 'src/app/model/robotType';
import Robot from 'src/app/model/robot';

describe('AddRobotComponent', () => {
  let component: AddRobotComponent;
  let fixture: ComponentFixture<AddRobotComponent>;
  let robotService: RobotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRobotComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [RobotService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AddRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    robotService = TestBed.inject(RobotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default robot values', () => {
    expect(component.robot).toEqual({
      nickname: '',
      type: '',
      serialNumber: '',
      description: '',
      isActive: true
    });
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

  it('should call addRobot and return robot data', () => {
    spyOn(robotService, 'addRobot').and.returnValue(of(mockRobot));
    robotService.addRobot(component.robot);
    expect(robotService.addRobot).toHaveBeenCalledWith(component.robot);
  });

  it('should handle error on addRobot', () => {
    spyOn(robotService, 'addRobot').and.returnValue(throwError(() => new Error('Error')));
    component.addRobot();
  });
});