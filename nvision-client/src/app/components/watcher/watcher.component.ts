import { Component, OnInit } from '@angular/core';
import { SubjectWithoutMeasurements } from 'src/app/models/subject-without-measurements.model';
import { WatcherSubjectsService } from 'src/app/services/watcher-subjects.service';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit {

  constructor(private watcherSubjectsService: WatcherSubjectsService) { }

  subjects: SubjectWithoutMeasurements[] = [];
  subjectName = '';

  ngOnInit(): void {
    const watcherId = Number(localStorage.getItem('nvision-userId'));
    this.watcherSubjectsService.getSubjectsWithoutMeasurements(watcherId).subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  getCardImage(subject: SubjectWithoutMeasurements): string {
    if (subject.isPatient) {
      return './assets/patient.png';
    } else {
      const subjectSex = Math.floor(Math.random() * 2) === 0 ? 'Male' : 'Female';
      if (subjectSex === 'Male') {
        return './assets/grandfather.png';
      } else {
        return './assets/grandmother.png';
      }
    }
  }
}
