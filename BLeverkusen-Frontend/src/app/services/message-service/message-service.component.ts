import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class MessageServiceComponent {
  private messagesUrl = 'http://localhost:8083/api/marketingmanager/messages';

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl);
  }

  deleteMessage(id: number | null): Observable<any> {
    const url = `${this.messagesUrl}/${id}`;
    return this.http.delete(url);
  }

  addMessage(data: { title: string; body: string;}) {
    return this.http.post<any>(this.messagesUrl, data);
  }
}
