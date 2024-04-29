import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './pages/admin/admin-homepage/admin-homepage.component';
import { AdminViewAllUsersComponent } from './pages/admin/admin-view-all-users/admin-view-all-users.component';
import { AdminAuthGuard } from './guards/admin-auth-guard';
import { UserAuthGuard } from './guards/user-auth-guard';
import { EditProfileComponent } from './pages/general/edit-profile/edit-profile/edit-profile.component';
import { EventOrganizatorHomepageComponent } from './pages/event_organization/homepage/event-organizator-homepage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'adminHomePage', component: AdminHomepageComponent, canActivate: [AdminAuthGuard]},
    { path: 'adminViewAllUsers', component: AdminViewAllUsersComponent, canActivate: [AdminAuthGuard]},
    { path: 'editProfile', component: EditProfileComponent, canActivate: [UserAuthGuard]},
    { path: 'eventOrganizatorHomePage', component: EventOrganizatorHomepageComponent, canActivate: [UserAuthGuard]}
];
