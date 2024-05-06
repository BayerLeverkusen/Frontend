import { Injectable } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotleServiceService {
  private apiUrl = 'http://localhost:8082/api/hotel/getAll'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getHotels(city:string): Observable<Hotel[]> {
    let queryParams = {} as { [key: string]: string | string[] };
    queryParams['city'] = city; // Set the city query parameter

    return this.http.get<Hotel[]>(this.apiUrl, { params: queryParams });
  }
  
}
