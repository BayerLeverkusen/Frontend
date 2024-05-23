import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';
import { MessageListComponent } from '../../../components/message-list/message-list.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [HeaderComponent, MessageListComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {

}
