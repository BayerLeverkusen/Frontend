import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/admin-header/header.component";
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
    selector: 'app-event-organizator-homepage',
    standalone: true,
    templateUrl: './event-organizator-homepage.component.html',
    styleUrl: './event-organizator-homepage.component.css',
    imports: [FormsModule, CommonModule, HeaderComponent]
})
export class EventOrganizatorHomepageComponent {
  username = '';
  password = '';
  firstName = '';
  lastName = '';
  role = '';
  dateOfBirth = '';
  errorMessage = '';
  showModal = false;

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

    this.authService.register(credentials).subscribe({
      next: (response) => {
          console.log("User successfully registered!", response);
          this.showModal = true;
      },
      error: (err) => {
          console.error('Registration failed:', err);
      }
  });
  }

  hideModal() {
    this.showModal = false;
  }

  logOut(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.authService.logout();
  }
}
