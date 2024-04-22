import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/admin-header/header.component";
import { AuthService } from '../../../services/auth-service/auth.service';

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
  dateOfBirth = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  register(event?: Event) {
    if (event) {
      event.preventDefault();``
    }

    const credentials = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      dateOfBirth: this.dateOfBirth
    };

    this.authService.register(credentials);
  }

  logOut(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.authService.logout();
  }
}
