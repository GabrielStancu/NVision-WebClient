import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UpdateSubjectRequest } from 'src/app/requests/update-subject.request';
import { WatcherOption } from 'src/app/requests/watcher-option.request';
import { AccountService } from 'src/app/services/account.service';
import { SubjectDataService } from 'src/app/services/subject-data.service';

@Component({
  selector: 'app-subject-account',
  templateUrl: './subject-account.component.html',
  styleUrls: ['./subject-account.component.css']
})
export class SubjectAccountComponent implements OnInit {

  public photoFilePath = "";
  public collapsedSidebar = true;
  public subject: UpdateSubjectRequest;
  private readonly subjectId = Number(localStorage.getItem('nvision-userId'));
  public sexOptions: any[] = [];
  public filteredWatchers: Observable<WatcherOption[]>;
  public watchersFilter = new FormControl();

  constructor(private subjectDataService: SubjectDataService, private accountService: AccountService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.subjectDataService.getWatcherProfileData(this.subjectId).subscribe(s => {
      this.subject = s;
      this.photoFilePath = s.profilePictureSrc;
      if (this.subject.id !== undefined && this.subject.id !== null)
        this.watchersFilter.setValue({id: this.subject.watcherId, fullName: this.subject.watcherFullName});
    });
    this.sexOptions = [
      {value: 'M', viewValue: 'Male'},
      {value: 'F', viewValue: 'Female'}
    ];
    this.filteredWatchers = this.watchersFilter.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => this._filter(name))
    );
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  uploadPhoto(event: any): void {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.accountService.uploadPhoto(formData).subscribe((data: any) => {
      const photoFileName = data.toString();
      this.subject.profilePictureSrc = photoFileName;
      this.photoFilePath = this.accountService.getPhotosUrl() + '/' + photoFileName;
    });
  }

  onSaveChanges(): void {
    this.subjectDataService.saveChanges(this.subject).subscribe(res => {
      if (res) {
        this.toastr.success('Changes saved successfully');
        this.router.navigate(['subject']);
      } else {
        this.toastr.error('Username already taken or passwords don\'t match');
      }
    }, _ => {
      this.toastr.error('Invalid data submitted');
    })
  }

  parseSubjectSex(): string {
    if (this.subject.sex === 'M') {
      return 'Male';
    } else if (this.subject.sex === 'F') {
      return 'Female';
    } else {
      return 'Sex';
    }
  }

  onOptionSelected(dataOption: any) {
    const selectedWatcher = dataOption.option.value;
    this.subject.watcherId = selectedWatcher.id;
    this.subject.watcherFullName = selectedWatcher.fullName;
  }

  disabledSexSelector(): boolean {
    return this.subject.sex !== undefined && this.subject.sex !== null;
  }

  displayFn(watcher: WatcherOption): string {
    return watcher && watcher.fullName ? watcher.fullName : '';
  }

  private _filter(name: string): WatcherOption[] {
    const filterValue = name.toLowerCase();
    return this.subject.watchers.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }
}
