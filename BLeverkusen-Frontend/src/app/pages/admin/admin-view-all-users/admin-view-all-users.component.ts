import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { UserListComponent } from '../../../components/user-list/user-list.component';

@Component({
  selector: 'app-admin-view-all-users',
  standalone: true,
  templateUrl: './admin-view-all-users.component.html',
  styleUrl: './admin-view-all-users.component.css',
  imports: [HeaderComponent, UserListComponent]
})
export class AdminViewAllUsersComponent {

}
