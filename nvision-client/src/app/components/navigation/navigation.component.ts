import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/user-type.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showNavbar(): boolean {
    const username = localStorage.getItem('nvision-user');
    return username !== undefined && username !== '' && username !== null;
  }

  myHomeRoute(): string {
    const userType = localStorage.getItem('nvision-userType');
    return userType.toLowerCase();
  }

  getUsername(): string {
    return localStorage.getItem('nvision-user');
  }

  getUserIcon(): string {
    const userType = localStorage.getItem('nvision-userType');
    return (userType === UserType[UserType.Watcher].toString()) ? 'fa fa-user-md' : 'fa fa-user';
  }

  myAccountRoute(): string {
    const userType = localStorage.getItem('nvision-userType');
    return userType.toLowerCase() + '-account';
  }

  onLogoutClicked(): void {
    localStorage.removeItem('nvision-user');
    localStorage.removeItem('nvision-userType');
    this.router.navigate(['login']);
  }
}
