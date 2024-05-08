import { Component, Input, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubFacility } from '../../../models/clubFacility';
import { ClubFacilityService } from '../../../services/club-facility-service/club-facility.service';


@Component({
  selector: 'app-club-facilities-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-facilities-list.component.html',
  styleUrl: './club-facilities-list.component.css'
})
export class ClubFacilitiesListComponent implements OnInit {
  clubFacilities: ClubFacility[] = [];
  selectedClubFacilityId: number = -1;

  constructor(private clubFacilityService: ClubFacilityService) {}

  ngOnInit(): void {
    this.clubFacilityService.selectedType$.subscribe(type => {
      this.fetchClubFacilities();
    });
  }

  fetchClubFacilities() {
    this.clubFacilityService.getEligibleClubFacilitiesByTrainingType(this.clubFacilityService.selectedType).subscribe(
      (clubFacilities) => this.clubFacilities = clubFacilities,
      (err) => console.error('Failed to get club facilities:', err)
    );
  }

  toggleFacilitySelection(facilityId: number): void {
    if (this.selectedClubFacilityId === facilityId) {
      this.selectedClubFacilityId = -1;
      this.clubFacilityService.selectedClubFacilityId = -1;
    } else {
      this.selectedClubFacilityId = facilityId;
      this.clubFacilityService.selectedClubFacilityId = facilityId;
    }
  }

  isSelected(facilityId: number): boolean {
    return this.selectedClubFacilityId === facilityId;
  }

}
