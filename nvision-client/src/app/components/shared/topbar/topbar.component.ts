import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Resources } from 'src/app/helpers/resources/resources.constants';
import { UserType } from 'src/app/models/user-type.enum';
import { UserDisplayDataReply } from 'src/app/replies/user-display-data.reply';
import { UserDisplayDataRequest } from 'src/app/requests/user-display-data.request';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  public collapsedSidebar = true;
  @Output() sidebarChanged = new EventEmitter<{collapsed: boolean}>();
  private readonly userId = Number(localStorage.getItem(Resources.localStorageKeys.userIdKey));
  private readonly userType = UserType[localStorage.getItem(Resources.localStorageKeys.userTypeKey)];
  public displayUser: UserDisplayDataReply;

  ngOnInit(): void {
    const request = new UserDisplayDataRequest(this.userType, this.userId);
    this.accountService.getUserDisplayData(request).subscribe(resp => {
      this.displayUser = resp;
    });
  }

  toggleSidebar(): void {
    this.collapsedSidebar = !this.collapsedSidebar;
    this.sidebarChanged.emit({
      collapsed: this.collapsedSidebar
    });
  }

}
