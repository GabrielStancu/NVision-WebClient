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
      new SidebarOption('Customers', 'people-outline'),
      new SidebarOption('Message', 'chatbubble-outline'),
      new SidebarOption('Help', 'help-outline'),
      new SidebarOption('Settings', 'settings-outline'),
      new SidebarOption('Password', 'lock-closed-outline'),
      new SidebarOption('Sign Out', 'log-out-outline')
    ];
  }

  onOptionMouseOver(sidebarOption: SidebarOption): void {
    this.sidebarOptions.forEach(option => option.isActive = false);
    sidebarOption.isActive = true;
  }
}
