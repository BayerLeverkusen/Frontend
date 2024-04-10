import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './pages/admin-homepage/admin-homepage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'adminHomePage', component: AdminHomepageComponent}
];
