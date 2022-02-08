import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SubjectDataComponent } from './components/shared/subject-data/subject-data.component';
import { SubjectAccountComponent } from './components/subject/subject-account/subject-account.component';
import { SubjectComponent } from './components/subject/subject.component';
import { WatcherAccountComponent } from './components/watcher/watcher-account/watcher-account.component';
import { WatcherAlertsComponent } from './components/watcher/watcher-alerts/watcher-alerts.component';
import { WatcherSubjectsComponent } from './components/watcher/watcher-subjects/watcher-subjects.component';
import { WatcherComponent } from './components/watcher/watcher.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watcher', component: WatcherComponent, canActivate: [AuthGuard], data: { roles: 'Watcher' }},
  { path: 'subject', component: SubjectComponent, canActivate: [AuthGuard], data: { roles: 'Subject' } },
  { path: 'watcher-account', component: WatcherAccountComponent, canActivate: [AuthGuard], data: { roles: 'Watcher' } },
  { path: 'subject-account', component: SubjectAccountComponent, canActivate: [AuthGuard], data: { roles: 'Subject' } },
  { path: 'watcher-subjects', component: WatcherSubjectsComponent, canActivate: [AuthGuard], data: { roles: 'Watcher' }},
  { path: 'watcher-alerts', component: WatcherAlertsComponent, canActivate: [AuthGuard], data: { roles: 'Watcher' }},
  { path: 'subject-data/:id', component: SubjectDataComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
