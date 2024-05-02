import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';



@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule], // Add CommonModule to the imports array
})

export class HeaderComponent {

  @Input() link1: string ='';
  @Input()  route1: string=''; 

  @Input() link2: string ='';
  @Input()  route2: string='';

  @Input() link3: string ='';
  @Input()  route3: string='';

  @Input() link4: string ='';
  @Input()  route4: string='';

  @Input() link5: string ='';
  @Input()  route5: string='';

  @Input() link6: string ='';
  @Input()  route6: string='';

  @Input() link7: string ='';
  @Input()  route7: string='';
  
  showModal = false;


  constructor(private router: Router, private authService: AuthService) { }

  toggleModal() {
    this.showModal = !this.showModal; // Toggle the value of showModal
  }

  editProfile(event? : Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/editProfile']);
  }

  logout(event?: Event){
    if (event) {
      event.preventDefault();
    }
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  viewUsers(event?: Event){
    if (event) {
      event.preventDefault();
    }

    this.router.navigate(['/adminViewAllUsers']);
  }
  routeForward(routeId: number, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    let targetRoute: string;
  
    switch(routeId) {
      case 1:
        targetRoute = this.route1;
        break;
      case 2:
        targetRoute = this.route2;
        break;
      case 3:
        targetRoute = this.route3;
        break;
      case 4:
        targetRoute = this.route4;
        break;
      case 5:
        targetRoute = this.route5;
        break;
      case 6:
        targetRoute = this.route6;
        break;
      case 7:
        targetRoute = this.route7;
        break;
      default:
        // Handle default case if routeId is not in the expected range
        console.log('Invalid routeId:', routeId);
        return;
    }
  
    // Navigate to the target route based on the routeId
    this.router.navigate([targetRoute]);
  }
  
  userInitial: string | undefined | null = null;

  ngOnInit(): void {
    this.userInitial = this.authService.getUsernameFromToken()?.charAt(0).toUpperCase();
    console.log(this.userInitial);
  }
  
}
