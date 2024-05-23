import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-balance-service',
  standalone: true,
  imports: [],
  templateUrl: './balance-service.component.html',
  styleUrl: './balance-service.component.css'
})
export class BalanceServiceComponent {
  private balanceUrl = 'http://localhost:8081/api/fan/balance'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getBalance() {
    return this.http.get<number>(this.balanceUrl);
  }

  addFunds(amount: number): Observable<void> {
    return this.http.post<void>(`${this.balanceUrl}/add`, { amount });
  }


}
