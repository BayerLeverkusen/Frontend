import { Component, OnInit } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { JwtInterceptor } from '../../jwt.interceptor';
import { TokenService } from '../../token.service';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-alterprofile',
  standalone: true,
  imports: [FormsModule,CommonModule,SharedModule],
  templateUrl: './alterprofile.component.html',
  styleUrl: './alterprofile.component.css',

})
export class AlterprofileComponent {
  firstName = '';
  lastName = '';

  token: string | null = null;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private tokenService: TokenService
  ) { }

 // ngOnInit():void
 // {
   // this.enterPage();
  //}

  getData(event?: Event){
    if(event){
      event.preventDefault();
    }
    this.token = this.tokenService.getToken();
    //console.log('Ovo je token:');
    console.log(this.token);
    //console.log('Ovo je local storage');
    //console.log(localStorage);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any>('http://localhost:90/api/auth/profile',{headers}).subscribe(
      (response) => {
        if (response && response.firstName && response.lastName) {
          console.log(response.firstName + ' ' + response.lastName);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching profile data:', error);
      }
    );
  }
}
    


