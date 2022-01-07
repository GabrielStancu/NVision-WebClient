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
      new SidebarOption('NVision', 'logo-apple', true),
      new SidebarOption('Dashboard', 'home-outline'),
      new SidebarOption('Account', 'person-outline'),
      new SidebarOption('Subjects', 'people-outline'),
      new SidebarOption('Alerts', 'call-outline'),
      new SidebarOption('Log Out', 'log-out-outline')
    ];
  }

  onOptionMouseOver(sidebarOption: SidebarOption): void {
    this.sidebarOptions.forEach(option => option.isActive = false);
    sidebarOption.isActive = true;
  }
}
