import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { DirectorService } from '../../services/director-service/director.service';
import { budget } from '../../models/budget';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {

  constructor(private directorService:DirectorService, private authService:AuthService, private router:Router, private ngZone:NgZone){}
  
  userId:string = this.authService.getUsernameFromToken() ?? '';
  showModal = false;

  budgets: budget[] = [];
  ngOnInit():void{
    this.directorService.getProposals(this.userId).subscribe(data=>{this.budgets=data;});
    console.log(this.userId);
  }

  voteForProposal(Id:number)
  {
    this.directorService.getProposals(this.userId).subscribe(data=>{this.budgets=data;});
    this.directorService.vote({userId:this.userId,proposalId:Id});
    this.showModal = true;
    
    this.delayRefresh();
  }

  hideModal() {
    this.showModal = false;
  }


  refreshPage() {
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }

  delayRefresh() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.refreshPage();
        });
      }, 2000);
    });
  }
}
