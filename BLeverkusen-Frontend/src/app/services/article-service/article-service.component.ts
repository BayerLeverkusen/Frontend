import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../../models/article'; // Assuming Article model is imported from the correct path
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ArticleService {
  private articlesUrl = 'http://localhost:8083/api/marketingmanager/articles'; // Assuming this is the correct endpoint for getting all articles
  private editArticleUrl = 'http://localhost:8083/api/marketingmanager/articles'; // Assuming this is the correct endpoint for editing an article
  private deleteArticleUrl = 'http://localhost:8083/api/marketingmanager/articles'; // Assuming this is the correct endpoint for deleting an article
  
  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl);
  }

  editArticle(id: number, updatedArticleData: any): Observable<any> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.put(url, updatedArticleData);
  }

  deleteArticle(id: number): Observable<any> {
    const url = `${this.deleteArticleUrl}/${id}`;
    return this.http.delete(url);
  }

  addArticle(data: { name: string; price: number; description: string;}) {
    return this.http.post<any>(this.articlesUrl, data);
  }
}
