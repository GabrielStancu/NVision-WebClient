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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watcher', component: WatcherComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'watcher-account', component: WatcherAccountComponent },
  { path: 'subject-account', component: SubjectAccountComponent },
  { path: 'watcher-subjects', component: WatcherSubjectsComponent},
  { path: 'watcher-alerts', component: WatcherAlertsComponent},
  { path: 'subject-data/:id', component: SubjectDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
