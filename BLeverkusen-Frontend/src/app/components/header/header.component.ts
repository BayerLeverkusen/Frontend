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

  editProfile() {
    console.log('Edit Profile clicked');
  }

  logout(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/login']);
  }
}
