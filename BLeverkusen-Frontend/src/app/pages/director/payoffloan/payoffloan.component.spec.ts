import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoffloanComponent } from './payoffloan.component';

describe('PayoffloanComponent', () => {
  let component: PayoffloanComponent;
  let fixture: ComponentFixture<PayoffloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoffloanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayoffloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
