import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceServiceComponent } from './balance-service.component';

describe('BalanceServiceComponent', () => {
  let component: BalanceServiceComponent;
  let fixture: ComponentFixture<BalanceServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
