import { Component, OnInit } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginCredentials } from './login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { TokenService } from '../../token.service';
import { JwtInterceptor } from '../../jwt.interceptor';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  login(event?: Event) {
    debugger
    if (event) {
      event.preventDefault();
    }

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:90/api/auth/login', credentials)
      .subscribe(
        response => {
          const token = response.token;
          const userRole = this.jwtHelper.decodeToken(token).role;
          //console.log(this.jwtHelper.decodeToken(token));

          this.tokenService.setToken(token);
          console.log(token);

          if (userRole === 'ADMIN') {
            this.router.navigate(['/adminHomePage']);
          } else if (userRole === 'DIRECTOR') {
            this.router.navigate(['/profile']);
          } else {
            console.log("Not an admin or director");
          }
        },
        error => {
          this.errorMessage = 'Login failed! Please check your credentials.';
          console.error('Error:', error);
        }
      );
  }

}
