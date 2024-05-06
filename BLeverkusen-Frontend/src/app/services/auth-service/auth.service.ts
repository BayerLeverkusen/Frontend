import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/api/auth/login';
  private registerUrl = 'http://localhost:8081/api/auth/register';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(this.loginUrl, credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.routeUserBasedOnRole(response.token);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  register(credentials: { username: string; password: string; firstName: string; lastName: string; role: string; dateOfBirth: string }) {
    return this.http.post<any>(this.registerUrl, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;
    }
    return '';
  }

  routeUserBasedOnRole(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userRole = decodedToken.role;

    switch (userRole) {
      case 'ADMIN':
        this.router.navigate(['/adminHomePage']);
        break;
      case 'SHOP_MANAGER':
        this.router.navigate(['/articlesDashboard']);
        break;
      case 'EVENT_ORGANIZATOR':
        this.router.navigate(['/eventOrganizatorHomePage']);
        break;
      case 'HEAD_COACH':
        this.router.navigate(['/createTraining']);
        break;
      default:
        console.log("Nisi admin batoo");
        break;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
