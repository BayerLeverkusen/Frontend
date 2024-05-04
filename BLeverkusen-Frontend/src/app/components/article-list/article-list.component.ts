import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article'; // Assuming Article model is imported from the correct path
import { ArticleService } from '../../services/article-service/article-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit{
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (articles) => this.articles = articles,
      error: (err) => console.error('Failed to get articles:', err)
    });
  }

  deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe({
      next: () => {
        console.log('Article deleted successfully');
        this.articles = this.articles.filter(article => article.id !== id);
      },
      error: (err) => console.error('Failed to delete article:', err)
    });
  }
}
