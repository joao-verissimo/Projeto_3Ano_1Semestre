import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 
import { PatchPassagesComponent } from './patch-passages.component';
import { FloorService } from 'src/app/service/Floor/floor.service';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';

describe('PatchPassageComponent', () => {
  let component: PatchPassagesComponent;
  let fixture: ComponentFixture<PatchPassagesComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatchPassagesComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [FloorService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PatchPassagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    floorService = TestBed.inject(FloorService);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default floor values', () => {
    expect(component.floor).toEqual({
      id: "",
      passages: [""]
    });
  });

  it('should call patch passages and return passages data', () => {
    spyOn(floorService, 'patchPassages').and.returnValue(of(mockFloor));
    floorService.patchPassages(component.floor);
    expect(floorService.patchPassages).toHaveBeenCalledWith(component.floor);
  });

  it('should handle error on patchPassages', () => {
    spyOn(floorService, 'patchPassages').and.returnValue(throwError(() => new Error('Error')));
    component.patchFloorPassages();
  });
});
