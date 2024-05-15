import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Training } from '../../models/training';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private createUrl = 'http://localhost:8084/api/training/create';
  private baseUrl = 'http://localhost:8084/api/training';


  create(credentials: {date: string, time: string, clubFacilityId: number, playerIds: number[] }){
    return this.http.post<any>(this.createUrl, credentials);
  }

  getTrainingsByClubFacilityId(clubFacilityId: number): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.baseUrl}/getByClubFacilityId/${clubFacilityId}`);
  }


  constructor(
    private http: HttpClient,
  ) { }
}
