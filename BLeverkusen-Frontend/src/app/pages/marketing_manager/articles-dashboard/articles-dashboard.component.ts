import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../components/admin-header/header.component";
import { SubheaderComponent } from '../../../components/subheader/subheader.component';
import { ArticleListComponent } from '../../../components/article-list/article-list.component';


@Component({
  selector: 'app-articles-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SubheaderComponent, ArticleListComponent],
  templateUrl: './articles-dashboard.component.html',
  styleUrl: './articles-dashboard.component.css'
})
export class ArticlesDashboardComponent {

}
