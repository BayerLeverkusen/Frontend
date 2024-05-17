import { Component, Input, OnInit } from '@angular/core';
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
  @Input() unavailablePlayerIds: number[] = [];
  players: Player[] = [];
  selectedPlayerIds: number[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (players) => this.players = players,
      error: (err) => console.error('Failed to get players:', err)
    });
  }

  togglePlayerSelection(playerId: number): void {
    const index = this.selectedPlayerIds.indexOf(playerId);
    if (index === -1) {
      this.selectedPlayerIds.push(playerId);
      this.playerService.selectedPlayerIds.push(playerId);
    } else {
      this.selectedPlayerIds.splice(index,1);
      this.playerService.selectedPlayerIds.splice(index, 1);
    }
  }

  isSelected(playerId: number): boolean {
    return this.selectedPlayerIds.includes(playerId);
  }

  isUnavailable(playerId: number): boolean {
    return this.unavailablePlayerIds.includes(playerId);
  }


}
