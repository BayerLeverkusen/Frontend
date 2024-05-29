import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleWarehouseServiceComponent } from './article-warehouse-service.component';

describe('ArticleWarehouseServiceComponent', () => {
  let component: ArticleWarehouseServiceComponent;
  let fixture: ComponentFixture<ArticleWarehouseServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleWarehouseServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleWarehouseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
