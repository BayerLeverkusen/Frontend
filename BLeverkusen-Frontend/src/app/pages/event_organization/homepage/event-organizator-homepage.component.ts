import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/event-organizator-header/header.component";
import { AuthService } from '../../../services/auth-service/auth.service';
import { HotleServiceService } from '../../../services/eventOrganizationService/hotelService/hotle-service.service';
import { Router } from '@angular/router';
import { Hotel } from '../../../models/hotel';
import { TransportService } from '../../../services/eventOrganizationService/transportService/transport.service';
import { FieldService } from '../../../services/eventOrganizationService/fieldService/field.service';

@Component({
    selector: 'app-event-organizator-homepage',
    standalone: true,
    templateUrl: './event-organizator-homepage.component.html',
    styleUrl: './event-organizator-homepage.component.css',
    imports: [FormsModule, CommonModule, HeaderComponent]
    
   
})
export class EventOrganizatorHomepageComponent  {
  
  
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
  gameTypes: string[] = ['Home', 'Away'];
  gameType: string = '';
  minDate: string = '2024-05-23';
  hotels: Hotel[] = [];
  
  credentials = {
    city: this.city,
    country: this.country
  };

  constructor(
    private hotleService: HotleServiceService ,
    private transportService: TransportService ,
    private fieldService: FieldService 
  ) { }

  convertDateFormat(dateString: string): string {
    // Split the input date string by hyphens
    const [year, month, day] = dateString.split('-');
    
    // Return the new date format
    return `${month}-${day}-${year}`;
  }

  reserveHotel(resourceName: string) {
    const validationErrors = this.validateDates(this.startDate, this.endDate);

    if (validationErrors.length > 0) {
      // Display error messages to the user
      console.error('Invalid date selection:', validationErrors.join(', '));
      alert('Invalid date selection'); // Log errors for debugging
      // Consider using a user-friendly error notification mechanism (e.g., toaster, modal)
      return; // Prevent hotel reservation if validation fails
    }
    ////////
    this.startDate = this.convertDateFormat(this.startDate);
    this.endDate = this.convertDateFormat(this.endDate);
    //this.endDate = '05-27-2024';
    this.type = 'HOTEL';
    this.hotleService.reserveHotel({resourceName,startDate:this.startDate,endDate:this.endDate,city:this.city,country:this.country,type:this.type});
    ////////
    
    
    
  }
  

  reserveTransport(resourceName: string) {
    const validationErrors = this.validateDates(this.startDate, this.endDate);

    if (validationErrors.length > 0) {
      // Display error messages to the user
      console.error('Invalid date selection:', validationErrors.join(', '));
      alert('Invalid date selection'); // Log errors for debugging
      // Consider using a user-friendly error notification mechanism (e.g., toaster, modal)
      return; // Prevent hotel reservation if validation fails
    }
    this.startDate = this.convertDateFormat(this.startDate);
    this.endDate = this.convertDateFormat(this.endDate);
    //this.endDate = '05-27-2024';
    this.type = 'TRANSPORT';
    this.transportService.reserveHotel({resourceName,startDate:this.startDate,endDate:this.endDate,city:this.city,country:this.country,type:this.type});
    
  }

  reserveField(resourceName: string) {
    const validationErrors = this.validateDates(this.startDate, this.endDate);

    if (validationErrors.length > 0) {
      // Display error messages to the user
      console.error('Invalid date selection:', validationErrors.join(', ')); 
      alert('Invalid date selection');// Log errors for debugging
      // Consider using a user-friendly error notification mechanism (e.g., toaster, modal)
      return; // Prevent hotel reservation if validation fails
    }
    this.startDate = this.convertDateFormat(this.startDate);
    this.endDate = this.convertDateFormat(this.endDate);
    //this.endDate = '05-27-2024';
    this.type = 'HOTEL';
    this.fieldService.reserveHotel({resourceName,startDate:this.startDate,endDate:this.endDate,city:this.city,country:this.country,type:this.type});
    

  }

  openHotelDialog() {
    this.isHotelDialogOpen = true;
    this.hotleService.getHotels(this.city).subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => console.error('Failed to get users:', err)
    });
  }

  openTransportDialog() {
    this.isTransportDialogOpen = true;
    this.transportService.getHotels(this.city).subscribe({
      next: (hotels) => this.hotels = hotels,
      error: (err) => console.error('Failed to get users:', err)
    });
  }

  openFieldDialog() {
    this.isFieldDialogOpen = true;
    this.fieldService.getHotels(this.city).subscribe({
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
    return this.hasValue(this.eventName) && this.hasValue(this.startDate) && this.hasValue(this.endDate) && this.hasValue(this.country) && this.hasValue(this.city) && this.hasValue(this.gameType);
  }

  transportDisable(): boolean{
    if(this.gameType == 'Away')
      {
        return true;
      }
    return false;
  }
  
  validateDates(startDate: string | Date | null, endDate: string | Date | null): string[] {
    const errors: string[] = [];
  
    // Ensure both dates have values
    if (!startDate || !endDate) {
      errors.push('Please select both a start date and an end date.');
    }
  
    // Convert dates to Date objects if needed
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
  
    // Validate date formats
    if (startDateObj && !this.isValidDateFormat(startDateObj)) {
      errors.push('Start date format is invalid.');
    }
    if (endDateObj && !this.isValidDateFormat(endDateObj)) {
      errors.push('End date format is invalid.');
    }
  
    // Validate date logic
    if (startDateObj && endDateObj && startDateObj >= endDateObj) {
      errors.push('Start date cannot be after or equal to end date.');
    }
  
    // Add custom validation rules (optional)
    // ...
  
    return errors;
  }
  
  // Helper function to check valid date format (example)
  isValidDateFormat(date: Date): boolean {
    // Implement your desired date format validation logic here
    // (e.g., using a regular expression or a library like moment.js)
    return date instanceof Date && !isNaN(date.getTime());
  }
}
