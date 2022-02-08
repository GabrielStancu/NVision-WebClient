import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/user-type.enum';
import { RegisterUserRequest } from 'src/app/requests/register-user.request';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AccountService, private router: Router) { }

  registerUser = new RegisterUserRequest();
  userTypes: any[] = [];

  ngOnInit(): void {
    this.userTypes = [
      {value: UserType.Watcher, viewValue: 'Watcher'},
      {value: UserType.Subject, viewValue: 'Subject'}
    ];
  }

  onRegisterClicked(): void {
    this.authService.registerUser(this.registerUser).subscribe(registrationResult => {
          this.alertRegistrationResult(registrationResult);
        }, _ => {
          this.alertRegistrationError();
        });
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
