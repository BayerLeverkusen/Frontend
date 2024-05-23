import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { FormsModule } from '@angular/forms';
import { DirectorService } from '../../../services/director-service/director.service';

@Component({
  selector: 'app-loan-page',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FormsModule],
  templateUrl: './loan-page.component.html',
  styleUrl: './loan-page.component.css'
})
export class LoanPageComponent {
  ammount="";

  constructor(private directorService:DirectorService){}

  createLoanRequest(event?:Event)
  {
    if(event)
    {
      event.preventDefault();
    }
    
    console.log(this.ammount);
    this.directorService.createLoan(this.ammount);


  }

}
