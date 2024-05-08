import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../components/admin-header/header.component';
import { FormsModule } from '@angular/forms';
import { PlayerListComponent } from '../../../../components/player-list/player-list.component';
import { PlayerService } from '../../../../services/player-service/player.service';
import { ClubFacilityService } from '../../../../services/club-facility-service/club-facility.service';
import { ClubFacilitiesListComponent } from '../../../../components/club-facilities-list/club-facilities-list/club-facilities-list.component';
import { TrainingService } from '../../../../services/training-service/training.service';

@Component({
  selector: 'app-create-training',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, PlayerListComponent, ClubFacilitiesListComponent],
  templateUrl: './create-training.component.html',
  styleUrl: './create-training.component.css'
})
export class CreateTrainingComponent {
  isDropdownOpen = false;
  selectedType = '';
  selectedTime = '';
  selectedDate = '';

  constructor(
    private clubFacilityService: ClubFacilityService,
    private playerService: PlayerService,
    private trainingService : TrainingService,
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  selectType(type: string) {
    this.selectedType = type;
    this.clubFacilityService.selectedType = type;
  }

  createTraining() {
    const credentials = {
      date: this.selectedDate,
      time: this.selectedTime,
      clubFacilityId: this.clubFacilityService.selectedClubFacilityId,
      playerIds: this.playerService.selectedPlayerIds
    };

    this.trainingService.create(credentials).subscribe({
      next: () => {
        console.log('Training created successfully');
        this.playerService.selectedPlayerIds = [];
        this.clubFacilityService.selectedClubFacilityId = -1;
      },
      error: (err) => {
        console.error('Failed to create training:', err);
      }
    });
  }

}
