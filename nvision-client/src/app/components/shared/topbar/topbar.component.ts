import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor() { }

  public collapsedSidebar = true;
  @Output() sidebarChanged = new EventEmitter<{collapsed: boolean}>();

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.collapsedSidebar = !this.collapsedSidebar;
    this.sidebarChanged.emit({
      collapsed: this.collapsedSidebar
    });
  }

}
