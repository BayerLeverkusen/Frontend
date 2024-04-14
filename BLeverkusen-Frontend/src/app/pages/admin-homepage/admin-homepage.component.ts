import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-admin-homepage',
    standalone: true,
    templateUrl: './admin-homepage.component.html',
    styleUrl: './admin-homepage.component.css',
    imports: [FormsModule, CommonModule, HeaderComponent]
})
export class AdminHomepageComponent {
  username = '';
  password = '';
  firstName = '';
  lastName = '';
  role = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  register(event?: Event) {
    if (event) {
      event.preventDefault();``
    }

    const credentials = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role
    };

    this.http.post<any>('http://localhost:90/api/auth/register', credentials)
      .subscribe(
        response => {
          console.log("User successfully added!")
        },
        error => {
          this.errorMessage = 'There was a problem registering the user';
          console.error('Error:', error);
        }
      );
  }

  logOut(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/login']);
  }
}
