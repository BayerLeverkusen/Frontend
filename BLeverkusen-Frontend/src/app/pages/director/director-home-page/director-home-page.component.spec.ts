import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorHomePageComponent } from './director-home-page.component';

describe('DirectorHomePageComponent', () => {
  let component: DirectorHomePageComponent;
  let fixture: ComponentFixture<DirectorHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectorHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
