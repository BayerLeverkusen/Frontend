import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizatorMyEventsComponent } from './event-organizator-my-events.component';

describe('AdminHomepageComponent', () => {
  let component: EventOrganizatorMyEventsComponent;
  let fixture: ComponentFixture<EventOrganizatorMyEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrganizatorMyEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventOrganizatorMyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
