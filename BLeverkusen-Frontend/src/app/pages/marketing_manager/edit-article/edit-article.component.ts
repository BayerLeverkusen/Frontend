import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { ArticlesDashboardComponent } from '../articles-dashboard/articles-dashboard.component';
import { Injectable } from '@angular/core';
import { ArticleService } from '../../../services/article-service/article-service.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'any',
})
@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css',
})
export class EditArticleComponent implements OnInit {
  article_id: number = 0;
  currentRoute: string = '';
  name = '';
  price : number = 0; 
  description = '';
  showModal = false;

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url.join('/');
    this.extractArticleIdFromRoute();
  }

  private extractArticleIdFromRoute(): void {
    const segments = this.currentRoute.split('/');
    const lastSegment = segments[segments.length - 1];
    this.article_id = +lastSegment;
    console.log('Article ID:', this.article_id);
  }

  editArticle(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const data = {
      name: this.name,
      price: this.price,
      description: this.description,
    };

    this.articleService.editArticle(this.article_id, data).subscribe({
      next: (response: any) => {
        console.log("Sucessfully editted.");
        this.showModal = true; 
      },
      error: (err: any) => {
        console.error('Failed to add article:', err);
      },
    });
  }
  hideModal() {
    this.showModal = false;
    this.router.navigate(['/articlesDashboard']);
  }
}
