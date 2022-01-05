import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/user-type.model';
import { RegisterSubjectRequest } from 'src/app/requests/register-subject.request';
import { RegisterUserRequest } from 'src/app/requests/register-user.request';
import { RegisterWatcherRequest } from 'src/app/requests/register-watcher.request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  registerUser = new RegisterUserRequest();
  userType: UserType = undefined;

  watcherId: number;
  address: string;
  isPatient: boolean;
  sex: string;

  phoneNumber: string;

  ngOnInit(): void {
  }

  onRegisterClicked(): void {
    if (this.userType === UserType.Watcher) {
      this.registerWatcher();
    } else {
      this.registerSubject();
    }
  }

  onUserTypeSelected(userType: UserType): void {
    this.userType = userType;
  }

  onSexSelected(sex: string): void {
    this.sex = sex;
  }

  registerWatcher(): void {
    const watcher = new RegisterWatcherRequest()
      .fromUser(this.registerUser, this.phoneNumber);
    this.authService.registerWatcher(watcher).subscribe(registrationResult => {
      this.alertRegistrationResult(registrationResult);
    }, _ => {
      this.alertRegistrationError();
    });

    return null;
  }

  registerSubject(): void {
    const subject = new RegisterSubjectRequest()
      .fromUser(this.registerUser, this.watcherId, this.address, this.isPatient, this.sex);

    this.authService.registerSubject(subject).subscribe(registrationResult => {
      this.alertRegistrationResult(registrationResult);
    }, _ => {
      this.alertRegistrationError();
    });

    return null;
  }
  alertRegistrationResult(registrationResult: boolean): void {
    if (registrationResult === true) {
      alert('Registration successful, please login.');
      this.router.navigate(['login']);
    } else if (registrationResult === false) {
      alert ('The user already exists, please try again.');
    }
  }
  alertRegistrationError(): void {
    alert('Bad credentials, please try again.');
  }
}
