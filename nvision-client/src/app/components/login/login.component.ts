import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserReply } from 'src/app/replies/login-user.reply';
import { UserType } from 'src/app/models/user-type.enum';
import { AccountService } from 'src/app/services/account.service';
import { LoginUserRequest } from 'src/app/requests/login-user.request';
import { ToastrService } from 'ngx-toastr';
import { Resources } from 'src/app/helpers/resources/resources.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AccountService, private router: Router, private toastr: ToastrService) { }

  loginUser = new LoginUserRequest();

  ngOnInit(): void {
  }

  onLoginClicked(): void {
    this.authService.loginUser(this.loginUser).subscribe(res => {
      if (res.userType === UserType.Watcher) {
        this.loginWatcher(res);
      } else if (res.userType === UserType.Subject) {
        this.loginSubject(res);
      }
    }, _ => {
      this.toastr.error('Bad credentials, please try again.');
    });
  }

  private loginWatcher(loggedUser: LoginUserReply): void {
    localStorage.setItem(Resources.localStorageKeys.userNameKey, loggedUser.username);
    localStorage.setItem(Resources.localStorageKeys.userIdKey, loggedUser.id.toString());
    localStorage.setItem(Resources.localStorageKeys.userTokenKey, loggedUser.token);
    localStorage.setItem(Resources.localStorageKeys.userTypeKey, UserType[loggedUser.userType].toString());

    if (loggedUser.completeProfile) {
      this.router.navigate(['watcher']);
    } else {
      this.router.navigate(['watcher-account']);
    }
  }

  private loginSubject(loggedUser: LoginUserReply): void {
    localStorage.setItem(Resources.localStorageKeys.userNameKey, loggedUser.username);
    localStorage.setItem(Resources.localStorageKeys.userIdKey, loggedUser.id.toString());
    localStorage.setItem(Resources.localStorageKeys.userTokenKey, loggedUser.token);
    localStorage.setItem(Resources.localStorageKeys.userTypeKey, UserType[loggedUser.userType].toString());

    if (loggedUser.completeProfile) {
      this.router.navigate(['subject']);
    } else {
      this.router.navigate(['subject-account']);
    }
  }
}
