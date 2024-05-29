import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleWarehouseService {
  private apiUrl = '/api/marketingmanager/articlewarehouse';

  constructor(private http: HttpClient) {}

  addArticleWarehouse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data);
  }
}
