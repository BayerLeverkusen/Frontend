import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageServiceComponent } from '../../services/message-service/message-service.component';
import { Router } from '@angular/router';
import { Message } from '../../models/message';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit{
  
  // Declarations
  messages: Message[] = [];
  showModal = false;
  delete_boolean = false; 
  id_final : number | null = null; 

  // Start 
  ngOnInit(): void {
    this.messageService.getAllMessages().subscribe({
      next: (messages) => this.messages = messages.sort((a, b) => a.id - b.id),
      error: (err) => console.error('Failed to get articles:', err)
    });
  }

  // Construct
  constructor(private router: Router, private messageService: MessageServiceComponent) {}

  // Implement
  showModalToDecide(id: number): void {  
    this.id_final = id; 
    this.showModal = true;
  }

  routeForward(routeId: number, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/singlemessage', routeId]);
  }

  continueDelete()
  {
    this.messageService.deleteMessage(this.id_final).subscribe({
      next: () => {
        console.log('Message deleted successfully');
        this.messages = this.messages.filter(message => message.id !== this.id_final);
      },
      error: (err) => console.error('Failed to delete article:', err)
    });
    this.showModal = false; 
  }
  hideModal() {
    this.showModal = false;
    this.router.navigate(['/inbox']);
  }
}
