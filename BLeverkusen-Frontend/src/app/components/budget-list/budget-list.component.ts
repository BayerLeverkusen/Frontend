import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DirectorService } from '../../services/director-service/director.service';
import { budget } from '../../models/budget';
import { AuthService } from '../../services/auth-service/auth.service';


@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {

  constructor(private directorService:DirectorService, private authService:AuthService){}
  
  userId:string = this.authService.getUsernameFromToken() ?? '';
  showModal = false;

  budgets: budget[] = [];
  ngOnInit():void{
    this.directorService.getProposals(this.userId).subscribe(data=>{this.budgets=data;});
    console.log(this.userId);
  }

  voteForProposal(Id:number)
  {
    this.directorService.vote({userId:this.userId,proposalId:Id});
    this.directorService.getProposals(this.userId).subscribe(data=>{this.budgets=data;});
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }
}
