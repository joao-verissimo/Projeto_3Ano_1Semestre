import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBuildingsMinMaxComponent } from './list-buildings-min-max.component';
import { BuildingService } from '../../service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Building from '../../model/building';

describe('ListBuildingsMinMaxComponent', () => {
  let component: ListBuildingsMinMaxComponent;
  let fixture: ComponentFixture<ListBuildingsMinMaxComponent>;
  let buildingService: BuildingService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBuildingsMinMaxComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [BuildingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuildingsMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call loadBuildings', () => {
    spyOn(component, 'loadBuildings');
    component.ngOnInit();
    expect(component.loadBuildings).toHaveBeenCalled();
  });

  it('loadBuildings should fetch buildings', () => {
    spyOn(buildingService, 'getBuildingMaxMinFloor').and.returnValue(of(mockBuildings));
    component.loadBuildings();
    fixture.detectChanges();
    expect(buildingService.getBuildingMaxMinFloor).toHaveBeenCalledWith(component.minFloor, component.maxFloor);
    expect(component.buildings).toEqual(mockBuildings);
    expect(component.loading).toBeFalse();
  });

  it('loadBuildings should handle error', () => {
    const errorResponse = new Error('An error occurred');
    spyOn(buildingService, 'getBuildingMaxMinFloor').and.returnValue(throwError(() => errorResponse));
    component.loadBuildings();
    fixture.detectChanges();
    expect(component.buildings).toEqual([]);
    expect(component.loading).toBeFalse();
  });

});
