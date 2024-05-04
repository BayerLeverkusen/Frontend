import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.css'
})
export class SubheaderComponent{
  constructor(private router: Router) { }

  addArticle(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/addArticle']);
  }
}
