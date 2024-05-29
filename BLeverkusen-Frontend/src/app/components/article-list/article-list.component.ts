import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article'; // Assuming Article model is imported from the correct path
import { ArticleService } from '../../services/article-service/article-service.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageServiceComponent } from '../../services/message-service/message-service.component';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  showModal = false;
  showPromotionModalBool = false;
  deleteBoolean = false;
  idFinal: number | null = null;

  title: string = '';
  body: string = '';
  discountPercentage: number = 20; // Default value for discount
  promotingArticleId: number | null = null;

  private articlesUrl = 'http://localhost:8083/api/marketingmanager/articles';

  constructor(private messageService: MessageServiceComponent, private router: Router, private articleService: ArticleService, private toastr: NgToastService) {}

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (articles) => this.articles = articles.sort((a, b) => a.id - b.id),
      error: (err) => console.error('Failed to get articles:', err)
    });
  }

  showModalToDecide(id: number): void {  
    this.idFinal = id; 
    this.showModal = true;
  }

  routeForward(routeId: number, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/editArticle', routeId]);
  }

  continueDelete() {
    this.articleService.deleteArticle(this.idFinal!).subscribe({
      next: () => {
        console.log('Article deleted successfully');
        this.articles = this.articles.filter(article => article.id !== this.idFinal);
      },
      error: (err) => console.error('Failed to delete article:', err)
    });
    this.showModal = false; 
  }

  hideModal() {
    this.showModal = false;
    this.router.navigate(['/articlesDashboard']);
  }

  showPromotionModal(articleId: number) {
    this.showPromotionModalBool = true;
    this.promotingArticleId = articleId;
  }

  submitPromotion() {
    if (this.discountPercentage < 1 || this.discountPercentage > 99) {
      this.toastr.error({detail: "Error", summary: "Enter a number between 1 and 99."});
      return;
    }
    if (this.promotingArticleId !== null) {
      this.promote(this.promotingArticleId, this.discountPercentage);
      this.showPromotionModalBool = false;
    }
  }

  promote(articleId: number, discountPercentage: number) {
    // Function to generate a random character from the specified set
    const getRandomChar = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return chars.charAt(Math.floor(Math.random() * chars.length));
    };
  
    // Ensure discountPercentage is two digits
    const discountString = discountPercentage.toString().padStart(2, '0');
  
    // Generate the promotion code
    const promoCode = `${articleId}${discountString}${getRandomChar()}${getRandomChar()}${getRandomChar()}`;
  
    // Prepare the data with the promotion code as the body
    const data = {
      title: 'Promotion code',
      body: promoCode
    };
  
    // Send the message via the messageService
    this.messageService.addMessage(data).subscribe({
      next: (response: any) => {
        console.log('Promotion code sent successfully:', promoCode);
      },
      error: (err: any) => {
        console.error('Failed to send message:', err);
      }
    });
  }
}