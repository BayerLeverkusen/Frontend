import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
  trainingsByDate: any[] = [];
  unavailablePlayerIds: number[] = [];
  clubFacilityIdSubscription: Subscription = new Subscription;
  isClubFacilitySelected = false;

  constructor(
    private clubFacilityService: ClubFacilityService,
    private playerService: PlayerService,
    private trainingService : TrainingService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.clubFacilityIdSubscription = this.clubFacilityService.selectedClubFacilityId$.subscribe(id => {
      this.isClubFacilitySelected = id !== -1;
      if (this.isClubFacilitySelected) {
        this.fetchExistingTrainings();
      }
    });
    this.setMinDate();
    this.setDefaultDate();
  }

  ngOnDestroy(): void {
    this.clubFacilityIdSubscription.unsubscribe();
  }

  setMinDate(): void {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('training-date') as HTMLInputElement;
    if (dateInput) {
      this.renderer.setAttribute(dateInput, 'min', today);
    }
  }

  setDefaultDate(): void {
    this.selectedDate = new Date().toISOString().split('T')[0];
  }

  toggleDropdown() {
    this.clearDisabledSlots();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectTime(time: string) {
    this.fetchTrainingsByDate(this.selectedDate);
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

  fetchTrainingsByDate(date: string) {
    if (!this.selectedDate) return;
  
    this.trainingService.getTrainingsByDate(date).subscribe({
      next: (trainings) => {
        this.trainingsByDate = trainings;
        this.unavailablePlayerIds = this.calculateUnavailablePlayers();
        console.log(this.unavailablePlayerIds);
      },
      error: (err) => console.error('Failed to get trainings by date', err)
    });
  }
  
  calculateUnavailablePlayers(): number[] {
    this.unavailablePlayerIds = [];
    const selectedTime = new Date(`01/01/2000 ${this.selectedTime}`);
    const selectedEndTime = new Date(selectedTime.getTime() + 90 * 60000);

    this.trainingsByDate.forEach(training => {
      const trainingTime = new Date(`01/01/2000 ${training.time}`);
      const trainingEndTime = new Date(trainingTime.getTime() + 90 * 60000);

      if (trainingTime < selectedEndTime && trainingEndTime > selectedTime) {
        this.unavailablePlayerIds.push(...training.playerIds);
      }
    });

    return this.unavailablePlayerIds;
  }
  

  disableTimeSlots() {
    const selectedDate = new Date(this.selectedDate);
  
    this.existingTrainings.forEach(training => {
      const trainingDate = new Date(training.date);
      if (trainingDate.toDateString() === selectedDate.toDateString()) {
        const startTime = new Date(`01/01/2000 ${training.time}`);
        const endTime = new Date(startTime.getTime() + 60 * 60000);
        const adjustedStartTime = new Date(startTime.getTime() - 60 * 60000);
  
        const timeSlots = document.querySelectorAll('input[type="radio"][name="timetable"]');
        timeSlots.forEach(slot => {
          const slotValue = (slot as HTMLInputElement).value;
          const slotTime = new Date(`01/01/2000 ${slotValue}`);
  
          if (slotTime >= adjustedStartTime && slotTime <= endTime) {
            this.renderer.setAttribute(slot, 'disabled', 'true');
            this.renderer.addClass(slot.parentElement, 'disabled-slot');
          }
        });
      }
    });
  }

  clearDisabledSlots() {
    const disabledSlots = document.querySelectorAll('input[type="radio"][name="timetable"]');
    disabledSlots.forEach(slot => {
      this.renderer.removeAttribute(slot, 'disabled');
      this.renderer.removeClass(slot.parentElement, 'disabled-slot');
    });
  }

  onDateChange() {
    this.fetchTrainingsByDate(this.selectedDate);
    this.clearDisabledSlots();
    this.disableTimeSlots();
  }

}
