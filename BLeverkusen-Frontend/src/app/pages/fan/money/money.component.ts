import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { BalanceServiceComponent } from '../../../services/fan-service/balance-service/balance-service.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {
  balance: number = 0;
  fundsToAdd: number = 0;

  constructor(private balanceService: BalanceServiceComponent) {}

  ngOnInit(): void {
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

  addFunds() {
    if (this.fundsToAdd > 0) {
      this.balanceService.addFunds(this.fundsToAdd).subscribe({
        next: () => {
          this.balance += this.fundsToAdd;
          this.fundsToAdd = 0;
        },
        error: (err) => {
          console.error('Failed to add funds:', err);
        }
      });
    }
  }
}
