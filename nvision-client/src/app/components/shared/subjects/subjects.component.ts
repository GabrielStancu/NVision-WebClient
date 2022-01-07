import { Component, Input, OnInit } from '@angular/core';
import { WatcherDashboardSubjectReply } from 'src/app/replies/watcher-dashboard-data.reply';
import { DashboardSubject } from '../display-models/dashboard-subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  @Input() subjects: WatcherDashboardSubjectReply[];
  public dashboardSubjects: DashboardSubject[] = [];

  ngOnInit(): void {
    this.initPeople();
  }

  initPeople(): void {
    this.subjects.forEach(s => {
      for (let i = 0; i < 5; i++) {
        this.dashboardSubjects.push(
          new DashboardSubject(s.name, s.healthStatus)
        );
      }
    });
    this.dashboardSubjects = this.dashboardSubjects.reverse();
  }

}
