import { Component, Input, OnInit } from '@angular/core';
import { SidebarOption } from '../display-models/sidebar-option.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  @Input() collapsed: boolean;
  public sidebarOptions: SidebarOption[] = [];

  ngOnInit(): void {
    this.initSidebarOptions();
  }

  initSidebarOptions(): void {
    this.sidebarOptions = [
      new SidebarOption('NVision', 'logo-apple', '/watcher', true),
      new SidebarOption('Dashboard', 'home-outline', '/watcher'),
      new SidebarOption('Account', 'person-outline', '/watcher-account'),
      new SidebarOption('Subjects', 'people-outline', '/watcher-subjects'),
      new SidebarOption('Alerts', 'call-outline', '/watcher-alerts'),
      new SidebarOption('Log Out', 'log-out-outline', '/login')
    ];
  }

  onOptionMouseOver(sidebarOption: SidebarOption): void {
    this.sidebarOptions.forEach(option => option.isActive = false);
    sidebarOption.isActive = true;
  }
}
