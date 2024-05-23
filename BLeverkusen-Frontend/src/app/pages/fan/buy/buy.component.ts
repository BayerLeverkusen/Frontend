import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { ArticleService } from '../../../services/article-service/article-service.component';
import { Article } from '../../../models/article';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})

export class BuyComponent implements OnInit {

  article_id: number = 0;
  currentRoute: string = '';
  article: Article | undefined; 
  quantity: number = 1; 

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url.join('/'); 
    this.extractArticleIdFromRoute();
    this.fetchArticleDetails();
  }

  private extractArticleIdFromRoute(): void {
    const segments = this.currentRoute.split('/');
    const lastSegment = segments[segments.length - 1];
    this.article_id = +lastSegment;
  }

  private fetchArticleDetails(): void {
    this.articleService.getArticleById(this.article_id).subscribe(
      data => {
        this.article = data;
      },
      error => {
        console.error('Error fetching article details:', error);
      }
    );
  }

}
