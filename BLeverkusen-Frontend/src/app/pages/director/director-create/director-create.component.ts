import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { SubheaderComponent } from '../../../components/subheader/subheader.component';
import { DirectorService } from '../../../services/director-service/director.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-director-create',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FormsModule],
  templateUrl: './director-create.component.html',
  styleUrl: './director-create.component.css'
})

export class DirectorCreateComponent {

  marketingAmmount = '';
  eventOrgAmmount = '';
  sportingAmmount = '';
  showModal = false;

  constructor(private directorService:DirectorService){}

  createProposal(event?:Event)
  {
    if(event)
    {
      event.preventDefault();
    }

    this.directorService.createProposal({marketingAmmount:this.marketingAmmount,eventOrgAmmount:this.eventOrgAmmount,sportingAmmount:this.sportingAmmount});
    this.showModal = true;
    
  }

  hideModal() {
    this.showModal = false;
  }
}
