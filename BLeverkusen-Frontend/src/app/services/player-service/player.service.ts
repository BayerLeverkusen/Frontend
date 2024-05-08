import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../models/player';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'http://localhost:8084/api/player/getAll';

  selectedPlayerIds: number[] = [];


  constructor(
    private http: HttpClient,
  ) { }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl);
  }
}
