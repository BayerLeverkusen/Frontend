import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClubFacility } from '../../models/clubFacility';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClubFacilityService {
  private facilitiesUrl = 'http://localhost:8084/api/clubFacility/getByType';
  private allFacilitiesUrl = 'http://localhost:8084/api/clubFacility/getAll';

  private _selectedTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedType$: Observable<string> = this._selectedTypeSubject.asObservable();

  selectedClubFacilityId: number = -1;

  get selectedType(): string {
    return this._selectedTypeSubject.value;
  }

  set selectedType(type: string) {
    this._selectedTypeSubject.next(type);
  }

  constructor(
    private http: HttpClient,
  ) { }

  getEligibleClubFacilitiesByTrainingType(trainingType: string) : Observable<ClubFacility[]> {
    const facilityType = this.transformTrainingTypeToFacilityType(trainingType);
    const url = `${this.facilitiesUrl}?type=${facilityType}`;
    return this.http.get<ClubFacility[]>(url);
  }

  getAllFacilities(): Observable<ClubFacility[]> {
    return this.http.get<ClubFacility[]>(this.allFacilitiesUrl);
  }

  private transformTrainingTypeToFacilityType(type: string): string {
    switch (type) {
      case 'Recovery session':
        return 'HOSPITAL';
      case 'Endurance training':
        return 'GYM';
      case 'Shooting drill':
        return 'TRAINING_PITCH';
      case 'Tactical training':
        return 'MEETING_ROOM'
      default:
        return type;
    }
  }
}
