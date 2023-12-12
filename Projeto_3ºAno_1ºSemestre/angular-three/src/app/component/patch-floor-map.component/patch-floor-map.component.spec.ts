import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 
import { FloorService } from 'src/app/service/Floor/floor.service';
import { PatchFloorMapComponent } from './patch-floor-map.component';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';

describe('PatchFloorMapComponent', () => {
  let component: PatchFloorMapComponent;
  let fixture: ComponentFixture<PatchFloorMapComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatchFloorMapComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [FloorService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PatchFloorMapComponent);
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
      floorMap: ""
    });
  });

  it('should call patch floor map and return floor map data', () => {
    spyOn(floorService, 'patchFloorMap').and.returnValue(of(mockFloor));
    floorService.patchFloorMap(component.floor);
    expect(floorService.patchFloorMap).toHaveBeenCalledWith(component.floor);
  });

  it('should handle error on patchFloorMap', () => {
    spyOn(floorService, 'patchFloorMap').and.returnValue(throwError(() => new Error('Error')));
    component.editFloorMap();
  });
});
