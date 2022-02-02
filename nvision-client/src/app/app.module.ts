import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WatcherComponent } from './components/watcher/watcher.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AuthService } from './services/auth.service';
import { SubjectAccountComponent } from './components/subject/subject-account/subject-account.component';
import { WatcherAccountComponent } from './components/watcher/watcher-account/watcher-account.component';
import { IonicModule } from '@ionic/angular';
import { CardboxComponent } from './components/shared/cardbox/cardbox.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { SubjectsComponent } from './components/shared/subjects/subjects.component';
import { AlertsComponent } from './components/shared/alerts/alerts.component';
import { WatcherSubjectsComponent } from './components/watcher/watcher-subjects/watcher-subjects.component';
import { WatcherAlertsComponent } from './components/watcher/watcher-alerts/watcher-alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    WatcherComponent,
    SubjectComponent,
    SubjectAccountComponent,
    WatcherAccountComponent,
    TopbarComponent,
    CardboxComponent,
    SubjectsComponent,
    AlertsComponent,
    WatcherSubjectsComponent,
    WatcherAlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    IonicModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
