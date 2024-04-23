import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Failed to get users:', err)
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (err) => console.error('Failed to delete user:', err)
    });
  }
}
