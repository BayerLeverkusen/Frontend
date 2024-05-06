import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../components/admin-header/header.component';
import { FormsModule } from '@angular/forms';
import { PlayerListComponent } from '../../../../components/player-list/player-list.component';

@Component({
  selector: 'app-create-training',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, PlayerListComponent],
  templateUrl: './create-training.component.html',
  styleUrl: './create-training.component.css'
})
export class CreateTrainingComponent {
  isDropdownOpen = false;
  type = '';
  selectedTime = '';
  selectedDate = '';

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Selected Date:', this.selectedDate);
    console.log(this.type);
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

}
