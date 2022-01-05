import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SubjectAccountComponent } from './components/subject/subject-account/subject-account.component';
import { SubjectComponent } from './components/subject/subject.component';
import { WatcherDashboardComponent } from './components/watcher-dashboard/watcher-dashboard.component';
import { WatcherAccountComponent } from './components/watcher/watcher-account/watcher-account.component';
import { WatcherComponent } from './components/watcher/watcher.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watcher', component: WatcherComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'watcher-account', component: WatcherAccountComponent },
  { path: 'subject-account', component: SubjectAccountComponent },
  { path: 'watcher-dashboard', component: WatcherDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
