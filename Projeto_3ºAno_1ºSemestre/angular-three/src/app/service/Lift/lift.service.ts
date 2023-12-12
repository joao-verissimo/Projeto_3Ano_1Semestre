import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiftService {
  private apiBaseUrl = 'http://localhost:4000/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createLift(liftData: any) {
    console.log('liftData: ', liftData);
    return this.http.post(`${this.apiBaseUrl}/lift/create`, liftData);
  }
}
