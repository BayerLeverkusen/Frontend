import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { HotleServiceService } from '../../services/eventOrganizationService/hotelService/hotle-service.service';

@Component({
  selector: 'app-hotel-listbox.component',
  standalone: true,
  imports: [],
  templateUrl: './hotel-listbox.component.component.html',
  styleUrl: './hotel-listbox.component.component.css'
})
export class HotelListboxComponentComponent implements OnInit{
  hotels: Hotel[] = [];

  constructor(private hotleService: HotleServiceService) {}

  ngOnInit() {
    if (this.hotleService) { // Check if HotelService is injected
      //this.hotleService.getHotels().subscribe(hotels => {
       // this.hotels = hotels;
     // });
    } else {
      // Handle scenario where hotels are provided in another way (e.g., mocked data)
    }
  }

  // Optional: Implement a method to handle hotel selection (emit an event, store selection)
  selectHotel(hotel: Hotel) {
    // Your selection logic here
  }
}
