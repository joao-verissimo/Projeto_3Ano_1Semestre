import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFloorComponent } from './create-floor.component';
import { FloorService } from '../../service/Floor/floor.service';
import { of, throwError } from 'rxjs';

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let fixture: ComponentFixture<CreateFloorComponent>;
  let floorService: FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFloorComponent],
      providers: [FloorService],
    });

    fixture = TestBed.createComponent(CreateFloorComponent);
    component = fixture.componentInstance;
    floorService = TestBed.inject(FloorService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createFloor method on form submission', () => {
    const createFloorSpy = spyOn(floorService, 'createFloor').and.returnValue(of({}));
    component.createFloor();
    expect(createFloorSpy).toHaveBeenCalled();
  });

  it('should handle error on createFloor and log the error', () => {
    spyOn(console, 'error');
    spyOn(floorService, 'createFloor').and.returnValue(throwError('Error creating floor'));
    component.createFloor();
    expect(console.error).toHaveBeenCalledWith('Error:', 'Error creating floor');
  });
});
