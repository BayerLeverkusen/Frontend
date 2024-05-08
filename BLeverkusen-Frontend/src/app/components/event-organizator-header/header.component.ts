import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule], // Add CommonModule to the imports array
})
export class HeaderComponent {
  showModal = false;

  constructor(private router: Router) { }

  toggleModal() {
    this.showModal = !this.showModal; // Toggle the value of showModal
  }

  editProfile(event? : Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/editProfile']);
  }

  logout(event?: Event){
    if (event) {
      event.preventDefault();
    }
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  viewEvents(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorViewEvents']);
  }

  createEvent(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorReserveHotel']);
  }

  createTemplate(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorCreateTemplate']);
  }

  planner(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorPlanner']);
  }

  reports(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorReports']);

    
  }

  home(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/eventOrganizatorHomePage']);
  }
}
