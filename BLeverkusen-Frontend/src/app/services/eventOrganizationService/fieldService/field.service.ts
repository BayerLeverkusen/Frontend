import { Injectable } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private apiUrl = 'http://localhost:8082/api/field/getAll';
  private apiUrl2 = 'http://localhost:8082/api/field/reserve'; 
  private apiUrl3 = 'http://localhost:8082/api/field/get';
  private apiUrl4 = 'http://localhost:8082/api/reservation/getAll';// Replace with your actual API endpoint

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

  getAllReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl4);

  }
  
}