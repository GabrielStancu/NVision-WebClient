import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WatcherDataService } from 'src/app/services/watcher-data.service';
import { DisplaySubjectCard } from '../../shared/display-models/display-subject-card.model';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-watcher-subjects',
  templateUrl: './watcher-subjects.component.html',
  styleUrls: ['./watcher-subjects.component.css']
})
export class WatcherSubjectsComponent implements OnInit {

  constructor(private watcherDataService: WatcherDataService, private router: Router) { }

  collapsedSidebar = true;
  public subjects: DisplaySubjectCard[] = [];
  public displaySubjects: DisplaySubjectCard[] = [];
  public filteredSubjects: Observable<DisplaySubjectCard[]>;
  public subjectsFilter = new FormControl();

  ngOnInit(): void {
    this.watcherDataService.getWatcherSubjects(1).subscribe(subjects => {
      subjects.forEach(subject => {
        const displaySubjectCard = new DisplaySubjectCard().fromSubject(subject);
        this.subjects.push(displaySubjectCard);
        this.displaySubjects.push(displaySubjectCard);
      });
    });

    this.filteredSubjects = this.subjectsFilter.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => this._filter(name))
    );

    
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  onSubjectClicked(subject: DisplaySubjectCard): void {
    this.router.navigate(['/subject-data/' + subject.id.toString()]);
  }

  displayFn(subject: DisplaySubjectCard): string {
    return subject && subject.fullName ? subject.fullName : '';
  }

  private _filter(name: string): DisplaySubjectCard[] {
    const filterValue = name.toLowerCase();
    
    this.displaySubjects = [];
    this.displaySubjects = this.subjects.filter(s => s.fullName.toLowerCase().includes(filterValue));

    return this.subjects.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }
}
