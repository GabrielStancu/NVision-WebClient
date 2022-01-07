import { Component, OnInit } from '@angular/core';
import { WatcherDashboardDataReply } from 'src/app/replies/watcher-dashboard-data.reply';
import { WatcherDataService } from 'src/app/services/watcher-data.service';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit {

  constructor(private watcherDataService: WatcherDataService) { }
  collapsedSidebar = true;
  activeOptionId: string;
  watcherDashboardData: WatcherDashboardDataReply;

  ngOnInit(): void {
    this.watcherDataService.getWatcherDashboardData(1).subscribe(res => {
      this.watcherDashboardData = res;
      console.log(this.watcherDashboardData);
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }
}
