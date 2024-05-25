import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { ArticleService } from '../../../services/article-service/article-service.component';
import { Article } from '../../../models/article';
import { FormsModule } from '@angular/forms';
import { CartServiceComponent } from '../../../services/cart-service/cart-service.component';
import { MessageServiceComponent } from '../../../services/message-service/message-service.component';

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
  promoCode: string = ''; // Add the promoCode property
  discountedPrice: number | null = null; // Add the discountedPrice property

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private cartService: CartServiceComponent,
    private messageService: MessageServiceComponent
  ) {}

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
        this.calculateDiscountedPrice(); // Calculate discounted price if promoCode is valid
      },
      error => {
        console.error('Error fetching article details:', error);
      }
    );
  }

  applyPromoCode(): void {
    // Validate the promo code
    if (this.promoCode.length === 6 || this.promoCode.length === 7) {
      const articleIdFromCode = parseInt(this.promoCode.slice(0, this.promoCode.length - 5));
      const discountPercentage = parseInt(this.promoCode.slice(this.promoCode.length - 5, this.promoCode.length - 3));

      if (articleIdFromCode === this.article_id) {
        // Check if the promo code exists in the messages
        this.messageService.getAllMessages().subscribe(
          messages => {
            const promoExists = messages.some(message => message.body === this.promoCode);
            if (promoExists) {
              if (this.article) {
                this.discountedPrice = this.article.price * (1 - discountPercentage / 100);
                console.log('Promo code applied successfully');
              }
            } else {
              console.error('Invalid promo code');
              this.discountedPrice = null;
            }
          },
          error => {
            console.error('Error fetching messages:', error);
            this.discountedPrice = null;
          }
        );
      } else {
        console.error('Promo code does not match this article');
        this.discountedPrice = null;
      }
    } else {
      console.error('Invalid promo code format');
      this.discountedPrice = null;
    }
  }

  addToCart(): void {
    if (this.article) {
      const articleToAdd = { ...this.article }; // Clone the article
      if (this.discountedPrice !== null) {
        articleToAdd.price = this.discountedPrice;
      }
      this.cartService.addToCart(articleToAdd, this.quantity);
      console.log(`Added ${this.quantity} of article ${this.article.name} to the cart.`);
    }
  }

  private calculateDiscountedPrice(): void {
    if (this.promoCode && this.article) {
      const discountPercentage = parseInt(this.promoCode.slice(this.promoCode.length - 5, this.promoCode.length - 3));
      this.discountedPrice = this.article.price * (1 - discountPercentage / 100);
    } else {
      this.discountedPrice = null;
    }
  }
}
