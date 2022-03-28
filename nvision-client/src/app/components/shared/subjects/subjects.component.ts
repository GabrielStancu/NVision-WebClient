import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { WatcherSubjectReply } from 'src/app/replies/watcher-data.reply';
import { DashboardSubject } from '../display-models/display-subject.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input() subjects: WatcherSubjectReply[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dashboardSubjects: DashboardSubject[] = [];
  public dataSource = new MatTableDataSource<DashboardSubject>(this.dashboardSubjects);
  public displayedColumns = ['picture', 'name'];

  ngOnInit(): void {
    this.initPeople();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initPeople(): void {
    this.subjects.forEach(s => {
        this.dashboardSubjects.push(
          new DashboardSubject(s.name, s.healthStatus)
        );
    });
    this.dataSource = new MatTableDataSource<DashboardSubject>(this.dashboardSubjects);
    console.log(this.dataSource);
  }
}
