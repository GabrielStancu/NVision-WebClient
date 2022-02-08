import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-watcher-account',
  templateUrl: './watcher-account.component.html',
  styleUrls: ['./watcher-account.component.css']
})
export class WatcherAccountComponent implements OnInit {

  public photoFilePath = "";
  public collapsedSidebar = true;
  private readonly watcherId = Number(localStorage.getItem('nvision-userId'));

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
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
      this.photoFilePath = this.accountService.getPhotosUrl() + '/' + photoFileName;
    });
  }
}
