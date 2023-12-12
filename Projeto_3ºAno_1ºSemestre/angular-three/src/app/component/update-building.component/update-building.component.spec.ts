import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UpdateBuildingComponent } from './update-building.component';
import { BuildingService } from '../../service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import Building from 'src/app/model/building';

describe('UpdateBuildingComponent', () => {
  let component: UpdateBuildingComponent;
  let fixture: ComponentFixture<UpdateBuildingComponent>;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBuildingComponent],
      imports: [HttpClientTestingModule],
      providers: [BuildingService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBuildingComponent);
    component = fixture.componentInstance;
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch buildings on initialization', fakeAsync(() => {
    const buildings: Building[] = [
      { _id: '1', name: 'Building 1', localizationoncampus: 'Campus A', floors: 5, lifts: 2, maxCel: [0, 0] },
      { _id: '2', name: 'Building 2', localizationoncampus: 'Campus B', floors: 7, lifts: 3, maxCel: [1, 1] },
    ];
    spyOn(buildingService, 'getBuildings').and.returnValue(of(buildings));

    component.ngOnInit();
    tick();

    expect(component.buildings).toEqual(buildings);
  }));

  it('should update buildingData when selectedBuildingId is set', () => {
    component.selectedBuildingId = 'someId';
    component.updateBuilding();

    expect(component.buildingData.id).toEqual('someId');
  });

  it('should call updateBuilding when updateBuilding is called', fakeAsync(() => {
    const response = { message: 'Building updated successfully' };
    spyOn(buildingService, 'updateBuilding').and.returnValue(of(response));

    component.selectedBuildingId = 'someId';
    component.updateBuilding();
    tick();

    expect(buildingService.updateBuilding).toHaveBeenCalledWith(component.buildingData);
    // You can add more expectations here to check the behavior after the method is called
  }));

  it('should add a maxCel element when addMaxCel is called', () => {
    const initialLength = component.buildingData.maxCel.length;

    component.addMaxCel();

    expect(component.buildingData.maxCel.length).toEqual(initialLength + 1);
  });

  it('should remove a maxCel element when removeMaxCel is called', () => {
    component.buildingData.maxCel = [1, 2, 3];
    const initialLength = component.buildingData.maxCel.length;

    component.removeMaxCel(1);

    expect(component.buildingData.maxCel.length).toEqual(initialLength - 1);
    expect(component.buildingData.maxCel).toEqual([1, 3]);
  });
});
