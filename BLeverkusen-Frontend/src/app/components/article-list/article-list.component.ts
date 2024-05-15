import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article'; // Assuming Article model is imported from the correct path
import { ArticleService } from '../../services/article-service/article-service.component';
import { EditArticleComponent } from '../../pages/marketing_manager/edit-article/edit-article.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit{
  articles: Article[] = [];
  showModal = false;
  delete_boolean = false; 
  id_final : number | null = null; 
  private articlesUrl = 'http://localhost:8083/api/marketingmanager/articles';

  constructor(private router: Router, private articleService: ArticleService, private editArticleComponent: EditArticleComponent) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (articles) => this.articles = articles.sort((a, b) => a.id - b.id),
      error: (err) => console.error('Failed to get articles:', err)
    });
  }

  showModalToDecide(id: number): void {  
    this.id_final = id; 
    this.showModal = true;
  }

  routeForward(routeId: number, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/editArticle', routeId]);
  }

  continueDelete()
  {
    this.articleService.deleteArticle(this.id_final).subscribe({
      next: () => {
        console.log('Article deleted successfully');
        this.articles = this.articles.filter(article => article.id !== this.id_final);
      },
      error: (err) => console.error('Failed to delete article:', err)
    });
    this.showModal = false; 
  }
  hideModal() {
    this.showModal = false;
    this.router.navigate(['/articlesDashboard']);
  }

}
