import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/event-organizator-header/header.component";
import { AuthService } from '../../../services/auth-service/auth.service';
import { HotleServiceService } from '../../../services/eventOrganizationService/hotelService/hotle-service.service';
import { Router } from '@angular/router';
import { Hotel } from '../../../models/hotel';

@Component({
    selector: 'app-event-organizator-homepage',
    standalone: true,
    templateUrl: './event-organizator-homepage.component.html',
    styleUrl: './event-organizator-homepage.component.css',
    imports: [FormsModule, CommonModule, HeaderComponent]
    
   
})
export class EventOrganizatorHomepageComponent {
  
  
  password = '';
  firstName = '';
  //lastName = '';
  role = '';
  
  errorMessage = '';
  showModal = false;
  startDate = '';
  endDate = '';
  eventName = '';
  countries: string[] = ['Germany', 'Spain']; // Replace with your data
  cities: string[] = [ 'Leverkusen', 'Barcelona']; // Replace with your data
  country: string = '';
  city: string = '';
  type: string = '';
  isHotelDialogOpen = false;
  isTransportDialogOpen = false;
  isFieldDialogOpen = false;

  hotels: Hotel[] = [];
  
  credentials = {
    city: this.city,
    country: this.country
  };

  constructor(private hotleService: HotleServiceService) { }

  convertDateFormat(dateString: string): string {
    // Split the input date string by hyphens
    const [year, month, day] = dateString.split('-');
    
    // Return the new date format
    return `${month}-${day}-${year}`;
  }

  reserveHotel(resourceName: string) {
    this.startDate = this.convertDateFormat(this.startDate);
    this.endDate = this.convertDateFormat(this.endDate);
    //this.endDate = '05-27-2024';
    this.type = 'HOTEL';
    this.hotleService.reserveHotel({resourceName,startDate:this.startDate,endDate:this.endDate,city:this.city,country:this.country,type:this.type});
  }

  openHotelDialog() {
    this.isHotelDialogOpen = true;
    this.hotleService.getHotels(this.city).subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => console.error('Failed to get users:', err)
    });
  }

  openTransportDialog() {
    this.isHotelDialogOpen = true;
    this.hotleService.getHotels(this.city).subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => console.error('Failed to get users:', err)
    });
  }

  openFieldDialog() {
    this.isHotelDialogOpen = true;
    this.hotleService.getHotels(this.city).subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => console.error('Failed to get users:', err)
    });
  }

  

  closeDialog() {
    this.isHotelDialogOpen = false;
    this.isTransportDialogOpen = false;
    this.isFieldDialogOpen = false;
  }

  
  
  

  hideModal() {
    this.showModal = false;
  }

  hotel(event?: Event){
    if (event) {
      event.preventDefault();
    }

   // this.router.navigate(['/eventOrganizatorReserveHotel']);
  }

  transport(event?: Event){
    if (event) {
      event.preventDefault();
    }

    //this.router.navigate(['/eventOrganizatorReports']);
  }
  playingFields(event?: Event){
    if (event) {
      event.preventDefault();
    }

    //this.router.navigate(['/eventOrganizatorReports']);
  }

  hasValue(value: string): boolean {
    return value !== ''; // Check if the value is not an empty string
  }

  allInputsFilled(): boolean {
    return this.hasValue(this.eventName) && this.hasValue(this.startDate) && this.hasValue(this.endDate) && this.hasValue(this.country) && this.hasValue(this.city);
  }
  
}
