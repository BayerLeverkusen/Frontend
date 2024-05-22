import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomepageComponent } from './pages/admin/admin-homepage/admin-homepage.component';
import { AdminViewAllUsersComponent } from './pages/admin/admin-view-all-users/admin-view-all-users.component';
import { AdminAuthGuard } from './guards/admin-auth-guard';
import { UserAuthGuard } from './guards/user-auth-guard';
import { EditProfileComponent } from './pages/general/edit-profile/edit-profile/edit-profile.component';
import { EventOrganizatorHomepageComponent } from './pages/event_organization/homepage/event-organizator-homepage.component';
import { EventOrganizatorReserveHotelComponent } from './pages/event_organization/reserveHotels/event-organizator-reserve-hotel.component';

// Marketing Manager Imports
import { ArticlesDashboardComponent } from './pages/marketing_manager/articles-dashboard/articles-dashboard.component';
import { DirectorHomePageComponent } from './pages/director/director-home-page/director-home-page.component';
import { DirectorCreateComponent } from './pages/director/director-create/director-create.component';
import { VotingPageComponent } from './pages/board_member/voting-page/voting-page.component';
import { EventOrganizatorMyEventsComponent } from './pages/event_organization/myEvents/event-organizator-my-events.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'adminHomePage', component: AdminHomepageComponent, canActivate: [AdminAuthGuard]},
    { path: 'adminViewAllUsers', component: AdminViewAllUsersComponent, canActivate: [AdminAuthGuard]},
    { path: 'editProfile', component: EditProfileComponent, canActivate: [UserAuthGuard]},
    { path: 'articlesDashboard', component: ArticlesDashboardComponent },
    { path: 'eventOrganizatorHomePage', component: EventOrganizatorHomepageComponent, canActivate: [UserAuthGuard]},
    { path: 'eventOrganizatorMyEvents', component: EventOrganizatorMyEventsComponent, canActivate: [UserAuthGuard]},
    { path: 'directorCreateProposal', component: DirectorCreateComponent, canActivate: [UserAuthGuard]},
    { path: 'voting', component: VotingPageComponent, canActivate: [UserAuthGuard]}
];
