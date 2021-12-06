import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserDto } from 'src/app/dtos/logged-user.dto';
import { LoginUserDto } from 'src/app/dtos/login-user.dto';
import { UserType } from 'src/app/models/user-type.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginUser: LoginUserDto = new LoginUserDto();

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

  private loginWatcher(loggedUser: LoggedUserDto): void {
    localStorage.setItem('nvision-user', loggedUser.username);
    localStorage.setItem('nvision-userType', UserType[loggedUser.userType].toString());
    this.router.navigate(['watcher']);
  }

  private loginSubject(loggedUser: LoggedUserDto): void {
    localStorage.setItem('nvision-user', loggedUser.username);
    localStorage.setItem('nvision-userType', UserType[loggedUser.userType].toString());
    this.router.navigate(['subject']);
  }
}
