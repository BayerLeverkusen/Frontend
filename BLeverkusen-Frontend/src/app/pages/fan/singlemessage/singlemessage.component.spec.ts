import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglemessageComponent } from './singlemessage.component';

describe('SinglemessageComponent', () => {
  let component: SinglemessageComponent;
  let fixture: ComponentFixture<SinglemessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglemessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
