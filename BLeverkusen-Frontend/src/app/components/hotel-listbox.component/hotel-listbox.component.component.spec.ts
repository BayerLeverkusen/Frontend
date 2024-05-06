import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListboxComponentComponent } from './hotel-listbox.component.component';

describe('HotelListboxComponentComponent', () => {
  let component: HotelListboxComponentComponent;
  let fixture: ComponentFixture<HotelListboxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelListboxComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelListboxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
