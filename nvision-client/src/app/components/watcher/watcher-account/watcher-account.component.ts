import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateWatcherRequest } from 'src/app/requests/update-watcher.request';
import { AccountService } from 'src/app/services/account.service';
import { WatcherDataService } from 'src/app/services/watcher-data.service';

@Component({
  selector: 'app-watcher-account',
  templateUrl: './watcher-account.component.html',
  styleUrls: ['./watcher-account.component.css']
})
export class WatcherAccountComponent implements OnInit {

  public photoFilePath = "";
  public collapsedSidebar = true;
  public watcher: UpdateWatcherRequest;
  private readonly watcherId = Number(localStorage.getItem('nvision-userId'));

  constructor(private accountService: AccountService, private watcherDataService: WatcherDataService, 
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.watcherDataService.getWatcherProfileData(this.watcherId).subscribe(w => {
      this.watcher = w;
      this.photoFilePath = w.profilePictureSrc;
    });
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
      this.watcher.profilePictureSrc = photoFileName;
      this.photoFilePath = this.accountService.getPhotosUrl() + '/' + photoFileName;
    });
  }

  onSaveChanges(): void {
    this.watcherDataService.saveChanges(this.watcher).subscribe(res => {
      if (res) {
        this.toastr.success('Changes saved successfully');
        this.router.navigate(['watcher']);
      } else {
        this.toastr.error('Username already taken or passwords don\'t match');
      }
    }, _ => {
      this.toastr.error('Invalid data submitted');
    })
  }
}
