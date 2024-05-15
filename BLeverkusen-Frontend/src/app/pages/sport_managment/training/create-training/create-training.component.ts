import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../components/admin-header/header.component';
import { FormsModule } from '@angular/forms';
import { PlayerListComponent } from '../../../../components/player-list/player-list.component';
import { PlayerService } from '../../../../services/player-service/player.service';
import { ClubFacilityService } from '../../../../services/club-facility-service/club-facility.service';
import { ClubFacilitiesListComponent } from '../../../../components/club-facilities-list/club-facilities-list/club-facilities-list.component';
import { TrainingService } from '../../../../services/training-service/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-training',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, PlayerListComponent, ClubFacilitiesListComponent],
  templateUrl: './create-training.component.html',
  styleUrl: './create-training.component.css'
})
export class CreateTrainingComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  selectedType = '';
  selectedTime = '';
  selectedDate = '';
  existingTrainings: any[] = [];
  clubFacilityIdSubscription: Subscription = new Subscription;

  constructor(
    private clubFacilityService: ClubFacilityService,
    private playerService: PlayerService,
    private trainingService : TrainingService,
  ) {}

  ngOnInit(): void {
    this.clubFacilityIdSubscription = this.clubFacilityService.selectedClubFacilityId$.subscribe(id => {
      if (id !== -1) {
        this.fetchExistingTrainings();
      }
    });
  }

  ngOnDestroy(): void {
    this.clubFacilityIdSubscription.unsubscribe();
  }

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
        console.log('Existing trainings:', this.existingTrainings);
      },
      error: (err) => {
        console.error('Failed to create training:', err);
      }
    });
  }

  fetchExistingTrainings() {
    this.clearDisabledSlots();

    if (this.clubFacilityService.selectedClubFacilityId !== -1) {
      this.trainingService.getTrainingsByClubFacilityId(this.clubFacilityService.selectedClubFacilityId).subscribe({
        next: (trainings) => {
          this.existingTrainings = trainings;
          this.disableTimeSlots();
        },
        error: (err) => console.error('Failed to get existing trainings', err)
      })
    }
  }

  disableTimeSlots() {
    this.existingTrainings.forEach(training => {
      const startTime = new Date(`01/01/2000 ${training.time}`);
      const endTime = new Date(startTime.getTime() + 60 * 60000);
      const adjustedStartTime = new Date(startTime.getTime() - 60 * 60000);
  
      const timeSlots = document.querySelectorAll('input[type="radio"][name="timetable"]');
      timeSlots.forEach(slot => {
        const slotValue = (slot as HTMLInputElement).value;

        const slotTime = new Date(`01/01/2000 ${slotValue}`);
        
        if (slotTime >= adjustedStartTime && slotTime <= endTime) {
          slot.setAttribute('disabled', 'true');
          slot.parentElement?.classList.add('disabled-slot');
        }
      });
    });
  }

  clearDisabledSlots() {
    const disabledSlots = document.querySelectorAll('.disabled-slot');
    disabledSlots.forEach(slot => {
        slot.removeAttribute('disabled');
        slot.classList.remove('disabled-slot');
    });
}

}
