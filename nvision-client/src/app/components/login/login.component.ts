import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserReply } from 'src/app/replies/login-user.reply';
import { LoginUser } from 'src/app/models/login-user.model';
import { UserType } from 'src/app/models/user-type.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginUser = new LoginUser();

  ngOnInit(): void {
  }

  onLoginClicked(): void {
    this.authService.loginUser(this.loginUser).subscribe(res => {
      if (res === null) {
        alert('Bad credentials!');
      } else if (res.userType === UserType.Watcher) {
        this.loginWatcher(res);
      } else if (res.userType === UserType.Subject) {
        this.loginSubject(res);
      }
    });
  }

  private loginWatcher(loggedUser: LoginUserReply): void {
    localStorage.setItem('nvision-user', loggedUser.username);
    localStorage.setItem('nvision-userId', loggedUser.id.toString());
    localStorage.setItem('nvision-userType', UserType[loggedUser.userType].toString());
    this.router.navigate(['watcher']);
  }

  private loginSubject(loggedUser: LoginUserReply): void {
    localStorage.setItem('nvision-user', loggedUser.username);
    localStorage.setItem('nvision-userId', loggedUser.id.toString());
    localStorage.setItem('nvision-userType', UserType[loggedUser.userType].toString());
    this.router.navigate(['subject']);
  }
}
