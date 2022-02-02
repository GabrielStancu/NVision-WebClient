import { Component, Input, OnInit } from '@angular/core';
import { WatcherSubjectReply } from 'src/app/replies/watcher-data.reply';
import { DashboardSubject } from '../display-models/display-subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  @Input() subjects: WatcherSubjectReply[];
  public dashboardSubjects: DashboardSubject[] = [];

  ngOnInit(): void {
    this.initPeople();
  }

  initPeople(): void {
    this.subjects.forEach(s => {
        this.dashboardSubjects.push(
          new DashboardSubject(s.name, s.healthStatus)
        );
    });
    this.dashboardSubjects = this.dashboardSubjects.reverse();
  }

}
