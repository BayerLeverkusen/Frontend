import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { CommonModule } from '@angular/common';
import { BudgetListComponent } from '../../../components/budget-list/budget-list.component';
import { DirectorService } from '../../../services/director-service/director.service';

@Component({
  selector: 'app-voting-page',
  standalone: true,
  imports: [CommonModule,HeaderComponent,BudgetListComponent],
  templateUrl: './voting-page.component.html',
  styleUrl: './voting-page.component.css'
})
export class VotingPageComponent 
{
  
}
