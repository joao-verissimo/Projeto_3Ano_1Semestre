import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFloorsFromBuildingComponent } from './list-floors-from-building.component';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';

describe('ListFloorsFromBuildingComponent', () => {
  let component: ListFloorsFromBuildingComponent;
  let fixture: ComponentFixture<ListFloorsFromBuildingComponent>;
  let floorService: FloorService;
  let buildingService: BuildingService;

  // Mock data
  const mockBuildings: Building[] = [
    {
      _id: 'bld1',
      name: 'Building 1',
      localizationoncampus: 'North Campus',
      floors: 5,
      lifts: 2,
      maxCel: [100, 200]
    },
    {
      _id: 'bld2',
      name: 'Building 2',
      localizationoncampus: 'South Campus',
      floors: 8,
      lifts: 3,
      maxCel: [150, 250]
    }
  ];
  
  const mockFloors: Floor[] = [
    {
      _id: 'flr1',
      name: 'First Floor',
      building: mockBuildings[0],
      description: 'First floor description',
      hall: 'A1',
      room: 101,
      floorMap: 'floor1map.jpg',
      hasElevator: true,
      passages: []
    },
    {
      _id: 'flr2',
      name: 'Second Floor',
      building: mockBuildings[1],
      description: 'Second floor description',
      hall: 'B1',
      room: 201,
      floorMap: 'floor2map.jpg',
      hasElevator: false,
      passages: []
    }
  ];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFloorsFromBuildingComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [FloorService, BuildingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFloorsFromBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getBuildings', () => {
    spyOn(component, 'getBuildings').and.callThrough();
    spyOn(buildingService, 'getBuildings').and.returnValue(of(mockBuildings));
    component.ngOnInit();
    expect(component.getBuildings).toHaveBeenCalled();
    expect(buildingService.getBuildings).toHaveBeenCalled();
    expect(component.buildings).toEqual(mockBuildings);
  });

  it('listFloorsFromBuilding should fetch floors when buildingId is selected', () => {
    component.selectedBuildingId = 'bld1';
    spyOn(floorService, 'ListFloorsFromBuildingComponent').and.returnValue(of(mockFloors));
    component.listFloorsFromBuilding();
    expect(floorService.ListFloorsFromBuildingComponent).toHaveBeenCalledWith('bld1');
    expect(component.Floors).toEqual(mockFloors);
  });

  it('listFloorsFromBuilding should not fetch floors when buildingId is not selected', () => {
    component.selectedBuildingId = '';
    spyOn(floorService, 'ListFloorsFromBuildingComponent');
    component.listFloorsFromBuilding();
    expect(floorService.ListFloorsFromBuildingComponent).not.toHaveBeenCalled();
  });

});
