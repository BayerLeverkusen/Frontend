import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizatorHomepageComponent } from './event-organizator-homepage.component';

describe('AdminHomepageComponent', () => {
  let component: EventOrganizatorHomepageComponent;
  let fixture: ComponentFixture<EventOrganizatorHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrganizatorHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventOrganizatorHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
