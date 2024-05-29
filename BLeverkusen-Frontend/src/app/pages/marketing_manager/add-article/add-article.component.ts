import { Component } from '@angular/core';
import { ArticleService } from '../../../services/article-service/article-service.component';
import { ArticleWarehouseService } from '../../../services/article-warehouse-service/article-warehouse-service.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/admin-header/header.component";
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
  imports: [HeaderComponent, FormsModule, CommonModule]
})
export class AddArticleComponent {
  name = '';
  price: number = 0;
  description = '';
  warehouseId: number | null = null;
  amount: number = 0;
  showModal = false;

  constructor(
    private articleService: ArticleService,
    private articleWarehouseService: ArticleWarehouseService,
    private router: Router
  ) {}

  addA(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const articleData = {
      name: this.name,
      price: this.price,
      description: this.description
    };

    this.articleService.addArticle(articleData).subscribe({
      next: (response: any) => {
        const newArticleId = response.id;
        const warehouseData = {
          articleId: newArticleId,
          warehouseId: this.warehouseId,
          amount: this.amount
        };

        this.articleWarehouseService.addArticleWarehouse(warehouseData).subscribe({
          next: () => {
            this.showModal = true;
          },
          error: (err: any) => {
            console.error('Failed to add article warehouse entry:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to add article:', err);
      }
    });
  }

  hideModal() {
    this.showModal = false;
    this.router.navigate(['/articlesDashboard']);
  }
}
