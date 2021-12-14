import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert.model';
import { SubjectWithoutMeasurements } from 'src/app/models/subject-without-measurements.model';
import { WatcherSubjectsService } from 'src/app/services/watcher-data.service';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit {

  constructor(private watcherSubjectsService: WatcherSubjectsService) { }

  subjects: SubjectWithoutMeasurements[] = [];
  alerts: Alert[] = [];
  subjectsCount = 0;
  subjectName = '';

  ngOnInit(): void {
    const watcherId = Number(localStorage.getItem('nvision-userId'));
    this.watcherSubjectsService.getWatcherHomepageData(watcherId).subscribe(watcherHomepageData => {
      this.subjects = watcherHomepageData.subjects;
      this.alerts = watcherHomepageData.alerts;
      this.subjectsCount = watcherHomepageData.subjectsCount;
    });
  }

  getCardImage(subject: SubjectWithoutMeasurements): string {
    if (subject.isPatient) {
      return './assets/patient.png';
    } else {
      if (subject.sex === 'M') {
        return './assets/grandfather.png';
      } else {
        return './assets/grandmother.png';
      }
    }
  }
}
