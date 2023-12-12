import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ListBuildingsComponent } from './list-buildings.component';
import { BuildingService } from '../../service/Building/building.service';
import { of, throwError } from 'rxjs';
import Building from 'src/app/model/building';

describe('ListBuildingsComponent', () => {
  let component: ListBuildingsComponent;
  let fixture: ComponentFixture<ListBuildingsComponent>;
  let buildingServiceSpy: jasmine.SpyObj<BuildingService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('BuildingService', ['getBuildings']);

    TestBed.configureTestingModule({
      declarations: [ListBuildingsComponent],
      providers: [{ provide: BuildingService, useValue: spy }],
    }).compileComponents();

    buildingServiceSpy = TestBed.inject(BuildingService) as jasmine.SpyObj<BuildingService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuildingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load buildings on init', () => {
    // Arrange
    const buildings: Building[] = [{ _id: '1', name: 'Building A', localizationoncampus: 'Campus XYZ', floors: 5, lifts: 2, maxCel: [] }];
    buildingServiceSpy.getBuildings.and.returnValue(of(buildings));

    // Act
    component.ngOnInit();

    // Assert
    expect(buildingServiceSpy.getBuildings).toHaveBeenCalled();
    expect(component.buildings).toEqual(buildings);
    expect(component.loading).toBeFalse();
  });

  it('should handle loading buildings with success', () => {
    // Arrange
    const buildings: Building[] = [{ _id: '1', name: 'Building A', localizationoncampus: 'Campus XYZ', floors: 5, lifts: 2, maxCel: [] }];
    buildingServiceSpy.getBuildings.and.returnValue(of(buildings));

    // Act
    component.loadBuildings();

    // Assert
    expect(component.buildings).toEqual(buildings);
    expect(component.loading).toBeFalse();
  });

  it('should handle loading buildings with error', () => {
    // Arrange
    const error = 'Error loading buildings';
    spyOn(console, 'error'); // Spy on console.error
  
    buildingServiceSpy.getBuildings.and.returnValue(throwError(error));
  
    // Act
    component.loadBuildings();
  
    // Assert
    expect(component.loading).toBeFalse();
    expect(console.error).toHaveBeenCalledWith('Error:', error);
  });
  

  it('should get building property', () => {
    // Arrange
    const building: Building = {
      _id: '1',
      name: 'Building A',
      localizationoncampus: 'Campus XYZ',
      floors: 5,
      lifts: 2,
      maxCel: []
    };

    // Act
    const result = component.getBuildingProp(building, 'name');

    // Assert
    expect(result).toBe('Building A');
  });

  it('should handle undefined property path when getting building property', () => {
    // Arrange
    const building: Building = {
      _id: '1',
      name: 'Building A',
      localizationoncampus: 'Campus XYZ',
      floors: 5,
      lifts: 2,
      maxCel: []
    };

    // Act
    const result = component.getBuildingProp(building, 'nonexistent.property.path');

    // Assert
    expect(result).toBeNull();
  });

  // Add more tests as needed based on your component's features and behavior.
});
