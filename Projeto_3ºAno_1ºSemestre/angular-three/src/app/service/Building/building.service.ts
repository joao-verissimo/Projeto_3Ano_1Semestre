import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import Building from 'src/app/model/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {  
  private apiBaseUrl = 'http://localhost:4000/api'; // Adjust the URL as needed
  private selectedBuildingId: string | null = null;
  constructor(private http: HttpClient) {}

  createBuilding(buildingData: any) {
    console.log('buildingData: ', buildingData);
    return this.http.post(`${this.apiBaseUrl}/building/create`, buildingData);
  }
  updateBuilding (buildingData: any){
    console.log('buildingData',buildingData);
    return this.http.put(`${this.apiBaseUrl}/building/update`,buildingData);
  }
 
  getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiBaseUrl}/building/list`);
  }
  getBuildingDetails(buildingId: string): Observable<Building> {
    return this.http.get<Building>(`${this.apiBaseUrl}/building/details/${buildingId}`);
  }
  setBuildingId(buildingId: string): void {
    this.selectedBuildingId = buildingId;
  }

  getBuildingId(): string | null {
    return this.selectedBuildingId;
  }
  getBuildingMaxMinFloor(minfloor:number,maxFloor:number): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiBaseUrl}/building/MinMaxFloors?minFloors=${minfloor}&maxFloors=${maxFloor}`);
  }

}