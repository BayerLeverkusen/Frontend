import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { CartServiceComponent, CartItem } from '../../../services/cart-service/cart-service.component';
import { CommonModule } from '@angular/common';
import { WarehouseServiceComponent } from '../../../services/warehouse-service/warehouse-service.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartServiceComponent, private warehouseService: WarehouseServiceComponent, private toast : NgToastService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };

  getTotalPrice(item: CartItem): number {
    return this.roundTo(item.article.price * item.quantity, 2);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + this.getTotalPrice(item), 0);
  }

  removeItem(articleId: number): void {
    this.cartService.removeFromCart(articleId);
    this.cartItems = this.cartService.getCartItems();
  }

  buyItems(): void {
    /// passing cart items in full 
    this.warehouseService.buyItems(this.cartItems).subscribe(
      response => {
        console.log('Purchase successful', response);
        this.toast.success({detail: "Success" ,summary: "Order completed!"});
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCartItems();
      },
      error => {
        console.error('Purchase failed', error);
      }
    );
  }
}
