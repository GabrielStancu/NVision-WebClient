import { Component, OnInit } from '@angular/core';
import { WatcherDataReply } from 'src/app/replies/watcher-data.reply';
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
  watcherData: WatcherDataReply;

  ngOnInit(): void {
    this.watcherDataService.getWatcherData(1).subscribe(res => {
      this.watcherData = res;
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }
}
