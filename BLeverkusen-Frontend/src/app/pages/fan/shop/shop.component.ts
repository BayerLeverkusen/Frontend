import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/article-service/article-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HeaderComponent, ArticleCardComponent, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        this.articles = articles.sort((a, b) => a.id - b.id);
        console.log('Fetched Articles:', this.articles);
      },
      error: (err) => console.error('Failed to get articles:', err)
    }); 
  }
  
}
