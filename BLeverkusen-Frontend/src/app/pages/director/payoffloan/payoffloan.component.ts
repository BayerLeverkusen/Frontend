import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { FormsModule } from '@angular/forms';
import { DirectorService } from '../../../services/director-service/director.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payoffloan',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FormsModule],
  templateUrl: './payoffloan.component.html',
  styleUrl: './payoffloan.component.css'
})
export class PayoffloanComponent {
  balance = ""; 
  ammount="";
  constructor(private directorService: DirectorService, private httpClient: HttpClient) {

  }

  ngOnInit():void{
    this.directorService.getBalance().subscribe(data=>{this.balance=data;});
    this.directorService.getLoanAmt().subscribe(data=>{this.ammount=data;});
    console.log(this.balance);
  }

  payLoan(event?:Event)
  {
    if(event)
    {
      event.preventDefault();
    }

    if(Number(this.balance)-Number(this.ammount)<0)
    {
      console.log("Insufficient funds.");
      return;
    }

    this.directorService.payLoan();

  }

}
