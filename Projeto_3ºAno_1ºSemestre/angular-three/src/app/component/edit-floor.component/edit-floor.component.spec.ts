import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { EditFloorComponent } from './edit-floor.component';
import Floor from 'src/app/model/floor';
import Building from 'src/app/model/building';

describe('EditFloorComponent', () => {
  let component: EditFloorComponent;
  let fixture: ComponentFixture<EditFloorComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFloorComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [FloorService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(EditFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    floorService = TestBed.inject(FloorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default floor values', () => {
    expect(component.floor).toEqual({
      id: "",
      name: '',
      building: "",
      description: '',
      hall: '',
      room: 0,
      floorMap: '',
      hasElevator: false,
      passages: [""]
    });
  });

  const mockBuilding: Building = {
    _id: "1",
    name: 'a',
    localizationoncampus: 'a',
    floors: 1,
    lifts: 1,
    maxCel: [1, 1]
  }

  const mockFloor: Floor = {
    _id: "2",
    name: 'a',
    building: mockBuilding,
    description: 'a',
    hall: 'a',
    room: 2,
    floorMap: 'aaaa',
    hasElevator: true,
    passages: []
  }

  it('should call editFloor and return floor data', () => {
    spyOn(floorService, 'editFloor').and.returnValue(of(mockFloor));
    floorService.editFloor(component.floor);
    expect(floorService.editFloor).toHaveBeenCalledWith(component.floor);
  });

  it('should handle error on editFloor', () => {
    spyOn(floorService, 'editFloor').and.returnValue(throwError(() => new Error('Error')));
    component.editFloor();
  });
});
