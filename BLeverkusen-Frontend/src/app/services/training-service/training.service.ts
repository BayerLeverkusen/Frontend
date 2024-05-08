import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private createUrl = 'http://localhost:8084/api/training/create';

  create(credentials: {date: string, time: string, clubFacilityId: number, playerIds: number[] }){
    return this.http.post<any>(this.createUrl, credentials);
  }


  constructor(
    private http: HttpClient,
  ) { }
}
