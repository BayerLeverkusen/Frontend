import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItem } from '../cart-service/cart-service.component';
import { CartItemDTO } from '../../models/CartItemDTO';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServiceComponent {

  private apiUrl = 'http://localhost:8083/api/marketingmanager/articlewarehouse'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  buyItems(cartItems: CartItem[]): Observable<any> {
    // casting
    const cartItemsDTO: CartItemDTO[] = cartItems.map(item => ({
      articleId: item.article.id,
      quantity: item.quantity
    }));
    const url = `${this.apiUrl}/buy`;
    console.log(cartItemsDTO);
    return this.http.post(url, cartItemsDTO).pipe(
      catchError((error: any) => {
        console.error('Error purchasing items:', error);
        throw error;
      })
    );
  }
}
