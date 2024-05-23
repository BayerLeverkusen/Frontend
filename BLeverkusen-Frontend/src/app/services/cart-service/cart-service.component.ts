import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {

    article: Article; 
    quantity: number; 
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceComponent {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(article: Article, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.article.id === article.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ article, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  removeFromCart(articleId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.article.id !== articleId);
    this.cartItemsSubject.next([...updatedItems]);
  }

}
