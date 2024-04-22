import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'any'
})
export class UserService {
  private usersUrl = 'http://localhost:8081/api/user/getAll';


  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}
