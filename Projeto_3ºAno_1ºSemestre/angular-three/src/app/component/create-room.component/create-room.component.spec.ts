import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CreateRoomComponent } from './create-room.component';
import Room, { RoomCategory } from 'src/app/model/room';
import { RoomService } from 'src/app/service/Room/Room.service';
import Building from 'src/app/model/building';
import Floor from 'src/app/model/floor';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;
  let roomService: RoomService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRoomComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [RoomService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    roomService = TestBed.inject(RoomService);
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

  const mockRoom: Room = {
    id: "1",
    floor: mockFloor,
    name: "a",
    category: RoomCategory.Anfiteatro,
    description: "a",
    dimension: [1, 1]
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default room values', () => {
    expect(component.room).toEqual({
      floor: "",
      name: "",
      category: RoomCategory.Anfiteatro,
      description: "",
      dimension: [0, 0]
    });
  });

  it('should call createRoom and return room data', () => {
    spyOn(roomService, 'createRoom').and.returnValue(of(mockRoom));
    roomService.createRoom(component.room);
    expect(roomService.createRoom).toHaveBeenCalledWith(component.room);
  });

  it('should handle error on createRoom', () => {
    spyOn(roomService, 'createRoom').and.returnValue(throwError(() => new Error('Error')));
    component.createRoom();
  });
});
