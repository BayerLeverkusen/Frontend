import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFacilitiesListComponent } from './club-facilities-list.component';

describe('ClubFacilitiesListComponent', () => {
  let component: ClubFacilitiesListComponent;
  let fixture: ComponentFixture<ClubFacilitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubFacilitiesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubFacilitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
