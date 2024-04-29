import { ComponentFixture, TestBed } from '@angular/core/testing';

import { eventOrganizatorHomepageComponent } from './event-organizator-homepage.component';

describe('AdminHomepageComponent', () => {
  let component: eventOrganizatorHomepageComponent;
  let fixture: ComponentFixture<eventOrganizatorHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [eventOrganizatorHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(eventOrganizatorHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
