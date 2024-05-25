import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { CartServiceComponent, CartItem } from '../../../services/cart-service/cart-service.component';
import { CommonModule } from '@angular/common';
import { WarehouseServiceComponent } from '../../../services/warehouse-service/warehouse-service.component';
import { NgToastService } from 'ng-angular-popup';
import { BalanceServiceComponent } from '../../../services/fan-service/balance-service/balance-service.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  balance: number = 0;
  negativeTotalAmount: number = 0; 

  constructor(
    private cartService: CartServiceComponent, 
    private warehouseService: WarehouseServiceComponent, 
    private toast: NgToastService,
    private balanceService: BalanceServiceComponent // Inject BalanceServiceComponent
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.fetchBalance();
  }

  fetchBalance() {
    this.balanceService.getBalance().subscribe({
      next: (balance) => {
        this.balance = balance;
      },
      error: (err) => {
        console.error('Failed to fetch balance:', err);
      }
    });
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
    const totalAmount = this.getTotalAmount();

    if (totalAmount > this.balance) {
      this.toast.error({detail: "Error", summary: "Insufficient funds!"});
      return;
    }

    this.warehouseService.buyItems(this.cartItems).subscribe(
      response => {
        console.log('Purchase successful', response);
        this.toast.success({detail: "Success", summary: "Order completed!"});
        this.cartService.clearCart();
        this.cartItems = this.cartService.getCartItems();
        // Deduct the total amount from user's balance
        this.balance -= totalAmount;
        this.negativeTotalAmount = -totalAmount;
        
        // Snalazenje sa POST requestom
        this.balanceService.addFunds(this.negativeTotalAmount).subscribe(
          () => {
            console.log('Balance updated successfully');
          },
          error => {
            console.error('Failed to update balance:', error);
          }
        );
      },
      error => {
        console.error('Purchase failed', error);
        this.toast.error({detail: "Error", summary: "Purchase failed. Please try again."});
      }
    );
  }
}
