import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseServiceComponent } from './warehouse-service.component';

describe('WarehouseServiceComponent', () => {
  let component: WarehouseServiceComponent;
  let fixture: ComponentFixture<WarehouseServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
