import { Injectable } from '@angular/core';
import { Hotel } from '../../../models/hotel';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DelRequest } from '../../../models/delRequest';
import { ModifyRequest } from '../../../models/modifyRequest';
import { DateRequest } from '../../../models/dateRequest';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8082/api/transport/getAll';
  private apiUrl2 = 'http://localhost:8082/api/transport/reserve'; // Replace with your actual API endpoint
  private apiUrl3 = 'http://localhost:8082/api/transport/get';
  private apiUrl4 = 'http://localhost:8082/api/reservation/delete';
  private apiUrl5 = 'http://localhost:8082/api/reservation/modify';
  private apiUrl6 = 'http://localhost:8082/api/reservation/validateDate';
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
  sm: number[] = [];
  
  deleteR(delRequests: DelRequest): Observable<void> {
    return this.http.request<void>('delete', this.apiUrl4, { body: delRequests });
  }

  modifyH(modifyRequest: ModifyRequest){
    alert('Successfully reserved');
    
    return this.http.post<any>(this.apiUrl5, modifyRequest)
    .subscribe(response => {
      console.log('Response:', response);
      alert('Successfully reserved');
    }, error => {
      console.error('Error:', error);
      alert('Error, try again');
    });
    
  }

  async validateDates(dateRequest: DateRequest): Promise<boolean> {
    try {
      const response$ = await this.http.post<boolean>(this.apiUrl6, dateRequest);
      const response = await response$.pipe(
        map(data => data) // Extract data from the observable
      ).toPromise();
      console.log('Response:', response);
      if (response === undefined) {
        throw new Error('Unexpected response format: data is undefined'); // Or return false
      }
      return response;
    } catch (error) {
      console.error('Error:', error);
      // Handle errors gracefully, return false or throw an informative error
      return false;
    }
  }
  
  
  
}
