import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { budget } from '../../models/budget';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor
  (
    private http:HttpClient
  ) 
  { }

  createProposal(credentials: { marketingAmmount: string, eventOrgAmmount: string, sportingAmmount: string }) {
    console.log(credentials);
    return this.http.put<any>('http://localhost:8085/api/auth/addProposal', credentials)
      .subscribe(response => {
        console.log('Response:', response);
      }, error => {
        console.error('Error:', error);
      });
  }

 /* getProposals(userId:string):Observable<budget[]>
  {
    return this.http.get<budget[]>('http://localhost:8085/api/auth/getProposals');
  }*/

  getProposals(userId: string): Observable<budget[]> {
    const params = new HttpParams().set('userId', userId);
    const url = 'http://localhost:8085/api/auth/getProposals';
    return this.http.get<budget[]>(url, { params });
  }
  
  getBalance()
  {
    const url = 'http://localhost:8085/api/auth/getBalance';
    return this.http.get<any>(url);
  }

  getLoanAmt()
  {
    const url = 'http://localhost:8085/api/auth/getLoanAmt';
    return this.http.get<any>(url);
  }

  payLoan()
  {
    return this.http.put<any>('http://localhost:8085/api/auth/payLoan',{})
    .subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
    });
  }

  vote(credentials:{userId:string,proposalId:number})
  {
    return this.http.put<any>('http://localhost:8085/api/auth/vote', credentials)
    .subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
    });
  }

  createLoan(ammount:string)
  {
    const body = { ammount: ammount };
    const url = 'http://localhost:8085/api/auth/requestLoan';
    return this.http.put<any>(url, body).subscribe(response => {
      console.log('Response:', response);
    }, error => {
      console.error('Error:', error);
    });
  }
}
