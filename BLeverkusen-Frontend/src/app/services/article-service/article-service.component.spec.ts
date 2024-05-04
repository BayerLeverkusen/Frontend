import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleServiceComponent } from './article-service.component';

describe('ArticleServiceComponent', () => {
  let component: ArticleServiceComponent;
  let fixture: ComponentFixture<ArticleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
