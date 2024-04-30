import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizatorReserveHotelComponent } from './event-organizator-reserve-hotel.component';

describe('AdminHomepageComponent', () => {
  let component: EventOrganizatorReserveHotelComponent;
  let fixture: ComponentFixture<EventOrganizatorReserveHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrganizatorReserveHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventOrganizatorReserveHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
