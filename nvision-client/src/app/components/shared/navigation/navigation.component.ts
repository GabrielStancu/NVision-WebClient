import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarOption } from '../display-models/sidebar-option.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() collapsed: boolean;
  public sidebarOptions: SidebarOption[] = [];

  ngOnInit(): void {
    this.initSidebarOptions();
  }

  initSidebarOptions(): void {
    this.sidebarOptions = [
      new SidebarOption('NVision', 'logo-apple', '/watcher'),
      new SidebarOption('Dashboard', 'home-outline', '/watcher', false, true),
      new SidebarOption('Account', 'person-outline', '/watcher-account'),
      new SidebarOption('Subjects', 'people-outline', '/watcher-subjects'),
      new SidebarOption('Alerts', 'call-outline', '/watcher-alerts'),
      new SidebarOption('Log Out', 'log-out-outline', '/login', true)
    ];
  }

  onOptionMouseOver(sidebarOption: SidebarOption): void {
    this.sidebarOptions.forEach(option => option.isActive = false);
    sidebarOption.isActive = true;
  }

  onOptionClick(sidebarOption: SidebarOption): void {
    if (sidebarOption.isLogOutOption) {
      localStorage.removeItem('nvision-user');
      localStorage.removeItem('nvision-userId');
      localStorage.removeItem('nvision-jwt');
      localStorage.removeItem('nvision-userType');
    } 
    this.router.navigate([sidebarOption.componentName]);
  }
}
