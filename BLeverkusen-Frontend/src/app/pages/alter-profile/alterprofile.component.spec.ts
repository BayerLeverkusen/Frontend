import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterprofileComponent } from './alterprofile.component';

describe('AlterprofileComponent', () => {
  let component: AlterprofileComponent;
  let fixture: ComponentFixture<AlterprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
