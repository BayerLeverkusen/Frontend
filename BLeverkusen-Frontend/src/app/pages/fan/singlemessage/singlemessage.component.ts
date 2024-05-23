import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../components/admin-header/header.component';

@Component({
  selector: 'app-singlemessage',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './singlemessage.component.html',
  styleUrl: './singlemessage.component.css'
})
export class SinglemessageComponent implements OnInit {

    message_id: number = 0; 
    currentRoute: string = '';

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.currentRoute = this.route.snapshot.url.join('/'); 
      this.extractArticleIdFromRoute();
    }
  
    private extractArticleIdFromRoute(): void {
      const segments = this.currentRoute.split('/');
      const lastSegment = segments[segments.length - 1];
      this.message_id = +lastSegment;
    }
}
