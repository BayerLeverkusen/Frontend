import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {

    @Input() name!: string; 
    @Input() price!: number;
    @Input() imageurl!: string; 

    constructor() { }
}
