import { Injectable } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotleServiceService {
  private apiUrl = 'http://localhost:8082/api/hotel/getAll';
  private apiUrl2 = 'http://localhost:8082/api/hotel/reserve';
  private apiUrl3 = 'http://localhost:8082/api/hotel/get';// Replace with your actual API endpoint
  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getHotels(city: string): Observable<Hotel[]> {
    const queryParams = { city }; // Create query parameter object
    return this.http.get<Hotel[]>(this.apiUrl + '?' + new URLSearchParams(queryParams));

  }

  reserveHotel(credentials:{resourceName:string,startDate:string,endDate:string,city:string,country:string,type:string}) {
    console.log(credentials);
    return this.http.post<any>(this.apiUrl2, credentials)
    .subscribe(response => {
      console.log('Response:', response);
      alert('Successfully reserved');
    }, error => {
      console.error('Error:', error);
      alert('Error, try again');
    });
  }

  getAll(): Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.apiUrl3);
  }
  
}
