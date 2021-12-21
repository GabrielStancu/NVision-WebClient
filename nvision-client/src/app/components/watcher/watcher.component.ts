import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert.model';
import { SubjectWithoutMeasurements } from 'src/app/models/subject-without-measurements.model';
import { WatcherHomepageDataRequest } from 'src/app/requests/watcher-homepage-data-request.model';
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
  dataRequest: WatcherHomepageDataRequest;
  subjectsCount = 0;

  ngOnInit(): void {
    const watcherId = Number(localStorage.getItem('nvision-userId'));
    this.dataRequest = new WatcherHomepageDataRequest(watcherId, 1, 4, '', 1, 2);
    this.applyFilters();
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

  prevPage(): void {
    this.dataRequest.subjectSpecificationDto.pageNumber--;
    this.applyFilters();
  }

  nextPage(): void {
    this.dataRequest.subjectSpecificationDto.pageNumber--;
    this.applyFilters();
  }

  disabledPrevPage(): boolean {
     return this.dataRequest.subjectSpecificationDto.pageNumber === 1;
  }

  disabledNextPage(): boolean {
    return this.dataRequest.subjectSpecificationDto.pageNumber === this.subjectTotalPages();
  }

  pageStartNumber(): number {
    return (this.dataRequest.subjectSpecificationDto.pageNumber - 1) * this.dataRequest.subjectSpecificationDto.pageSize + 1;
  }

  pageEndNumber(): number {
    return this.dataRequest.subjectSpecificationDto.pageNumber * this.dataRequest.subjectSpecificationDto.pageSize;
  }

  counter(i: number): any {
    return new Array(i);
  }

  subjectTotalPages(): number {
    const subjectsPerPages = this.subjectsCount / this.dataRequest.subjectSpecificationDto.pageSize;
    if (this.subjectsCount % this.dataRequest.subjectSpecificationDto.pageSize === 0) {
      return subjectsPerPages;
    } else {
      return subjectsPerPages + 1;
    }
  }

  answerAlert(): void {
    // TODO: send the asnwer to the server and get another alert in place of the answered one
  }

  applyFilters(): void {
    this.watcherSubjectsService.getWatcherHomepageData(this.dataRequest).subscribe(watcherHomepageData => {
      this.subjects = watcherHomepageData.subjects;
      this.alerts = watcherHomepageData.alerts;
      this.subjectsCount = watcherHomepageData.subjectsCount;
    });
  }

  isCrtPage(index: number): boolean {
    return (index + 1) === this.dataRequest.subjectSpecificationDto.pageNumber;
  }
}
