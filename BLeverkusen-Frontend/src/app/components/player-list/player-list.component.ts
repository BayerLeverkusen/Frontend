import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player-service/player.service';


@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (players) => this.players = players,
      error: (err) => console.error('Failed to get players:', err)
    });
  }

}
