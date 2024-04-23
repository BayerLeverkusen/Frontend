import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../components/admin-header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user-service/user.service';
import { AuthService } from '../../../../services/auth-service/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  username = this.authService.getUsernameFromToken();
  newFirstName = '';
  newLastName = '';
  newPassword = '';
  oldPassword = '';

  constructor(private authService: AuthService, private userService: UserService){}

  editUserProfile(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const credentials = {
      username: this.username,              
      name: this.newFirstName || null,                                  //if falsy (empty string/undefined/null) return null
      lastName: this.newLastName || null,
      oldPassword: this.oldPassword || null,
      newPassword: this.newPassword || null
    };
    this.userService.editProfile(credentials);

  }
}
