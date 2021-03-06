import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { WatcherSubjectReply } from 'src/app/replies/watcher-data.reply';
import { DashboardSubject } from '../display-models/display-subject.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  @Input() subjects: WatcherSubjectReply[];
  @Input() displayPaginator = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dashboardSubjects: DashboardSubject[] = [];
  public dataSource = new MatTableDataSource<DashboardSubject>(this.dashboardSubjects);
  public displayedColumns = ['picture', 'name', 'status'];

  ngOnInit(): void {
    this.initPeople();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initPeople(): void {
    this.subjects.forEach(s => {
        this.dashboardSubjects.push(
          new DashboardSubject(s.id, s.name, s.healthStatus, s.profilePictureSrc, s.healthScore)
        );
    });
    this.dataSource = new MatTableDataSource<DashboardSubject>(this.dashboardSubjects);
  }

  onSubjectClick(id: number): void {
    this.router.navigate(['/subject-data/' + id.toString()]);
  }

  subjectHealthIcon(healthScore: number): string {
    if (healthScore > 0)
      return 'add_circle';
    if (healthScore < 0) 
      return 'remove_circle';
    return 'help';
  }
}
