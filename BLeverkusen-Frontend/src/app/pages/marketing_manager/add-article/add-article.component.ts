import { Component } from '@angular/core';
import { ArticleService } from '../../../services/article-service/article-service.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../components/admin-header/header.component";


@Component({
  standalone: true, 
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
  imports: [HeaderComponent, FormsModule, CommonModule]
})
export class AddArticleComponent {
  name = '';
  price : number = 0; 
  description = '';
  showModal = false;

  constructor(private articleService: ArticleService) {}

  addA(event?: Event){
    if(event){
      event.preventDefault();
    }
    
    const data = {
      name: this.name,
      price: this.price,
      description: this.description
    };

    this.articleService.addArticle(data).subscribe({
      next: (response: any) => { 
          this.showModal = true;
      },
      error: (err: any) => {
          console.error('Failed to add article:', err);
      }
    });
  }
  hideModal() {
    this.showModal = false;
  }
}
