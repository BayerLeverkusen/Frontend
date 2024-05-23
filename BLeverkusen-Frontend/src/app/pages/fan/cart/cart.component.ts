import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { CartServiceComponent, CartItem } from '../../../services/cart-service/cart-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartServiceComponent) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(item: CartItem): number {
    return item.article.price * item.quantity;
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + this.getTotalPrice(item), 0);
  }

  removeItem(articleId: number): void {
    this.cartService.removeFromCart(articleId);
    this.cartItems = this.cartService.getCartItems();
  }
}
