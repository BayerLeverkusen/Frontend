import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'any'
})
export class UserService {
  private usersUrl = 'http://localhost:8081/api/user/getAll';
  private editProfileUrl = 'http://localhost:8081/api/user/editProfile';


  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  editProfile(credentials: {username: string | null; name: string | null; lastName: string | null; oldPassword: string | null; newPassword: string | null;}){
    return this.http.put(this.editProfileUrl, credentials).subscribe({
      next: (response) => {
        console.log("Profile successfully edited!", response);
      },
      error: (err) => {
        console.error('Editing failed:', err);
      }
    });
  }
}
