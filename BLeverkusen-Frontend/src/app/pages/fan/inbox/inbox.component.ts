import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/admin-header/header.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {

}
