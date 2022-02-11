import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  collapsedSidebar = true;
  constructor() { }

  ngOnInit(): void {
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }
}
