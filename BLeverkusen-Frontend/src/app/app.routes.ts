import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './pages/admin/admin-homepage/admin-homepage.component';
import { AdminViewAllUsersComponent } from './pages/admin/admin-view-all-users/admin-view-all-users.component';
import { AdminAuthGuard } from './guards/admin-auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'adminHomePage', component: AdminHomepageComponent, canActivate: [AdminAuthGuard]},
    { path: 'adminViewAllUsers', component: AdminViewAllUsersComponent, canActivate: [AdminAuthGuard]}
];
