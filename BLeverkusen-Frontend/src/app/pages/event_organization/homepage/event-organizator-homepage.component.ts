import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/event-organizator-header/header.component";
import { AuthService } from '../../../services/auth-service/auth.service';
import { Router } from '@angular/router';

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

  
  constructor(private router: Router) { }
  

  hideModal() {
    this.showModal = false;
  }

  hotels(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorReserveHotel']);
  }

  transport(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorReports']);
  }
  playingFields(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorReports']);
  }
}
