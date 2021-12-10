import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterSubject } from 'src/app/models/register-subject.model';
import { RegisterUser } from 'src/app/models/register-user.model';
import { RegisterWatcher } from 'src/app/models/register-watcher.model';
import { UserType } from 'src/app/models/user-type.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  registerUser = new RegisterUser();
  userType: UserType = undefined;

  watcherId: number;
  address: string;
  isPatient: boolean;

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

  registerWatcher(): void {
    const watcher = new RegisterWatcher()
      .fromUser(this.registerUser, this.phoneNumber);

    this.authService.registerWatcher(watcher).subscribe(registrationResult => {
      this.alertRegistrationResult(registrationResult);
    }, _ => {
      this.alertRegistrationError();
    });

    return null;
  }

  registerSubject(): void {
    const subject = new RegisterSubject()
      .fromUser(this.registerUser, this.watcherId, this.address, this.isPatient);

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
