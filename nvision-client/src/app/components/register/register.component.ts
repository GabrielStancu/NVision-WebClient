import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserType } from 'src/app/models/user-type.enum';
import { RegisterUserRequest } from 'src/app/requests/register-user.request';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AccountService, private router: Router, private toastr: ToastrService) { }

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
      this.toastr.success('Registration successful, please login.');
      this.router.navigate(['login']);
    } else if (registrationResult === false) {
      this.toastr.error('The user already exists, please try again.');
    }
  }

  alertRegistrationError(): void {
    this.toastr.error('Invalid data submitted, please try again.');
  }
}
