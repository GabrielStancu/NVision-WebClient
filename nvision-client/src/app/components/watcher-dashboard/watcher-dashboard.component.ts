import { Component, OnInit } from '@angular/core';
import { SidebarOption } from './sidebar-option.model';

@Component({
  selector: 'app-watcher-dashboard',
  templateUrl: './watcher-dashboard.component.html',
  styleUrls: ['./watcher-dashboard.component.css']
})
export class WatcherDashboardComponent implements OnInit {

  constructor() { }
  expandedSidebar = true;
  activeOptionId: string;
  sidebarOptions: SidebarOption[] = [];
  // list: NodeListOf<Element>;

  ngOnInit(): void {
    // this.list = document.querySelectorAll('.navigation li');
    // this.list.forEach(item => {
    //   item.addEventListener('mouseover', this.activeLink);
    // });
    this.initSidebarOptions();
  }

  // toggleSidebar(): void {
  //   const navigation = document.querySelector('.navigation');
  //   const main = document.querySelector('.main');

  //   navigation.classList.toggle('active');
  //   main.classList.toggle('active');
  // }

  // activeLink(): void {
  //   this.list.forEach(item => {
  //       item.classList.remove('hovered');
  //   });
  //   // this.classList.add('hovered');
  // }
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

  toggleSidebar(): void {
    this.expandedSidebar = !this.expandedSidebar;
  }

  onOptionMouseOver(sidebarOption: SidebarOption): void {
    this.sidebarOptions.forEach(option => option.isActive = false);
    sidebarOption.isActive = true;
  }
}
