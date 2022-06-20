import { Component, OnInit } from '@angular/core';
import { WatcherDataReply } from 'src/app/replies/watcher-data.reply';
import { WatcherTime } from 'src/app/requests/watcher-time.request';
import { WatcherDataService } from 'src/app/services/watcher-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit {

  constructor(private watcherDataService: WatcherDataService, private datePipe: DatePipe) { }
  collapsedSidebar = true;
  activeOptionId: string;
  watcherData: WatcherDataReply;
  private readonly watcherId = Number(localStorage.getItem('nvision-userId'));

  ngOnInit(): void {
    const crtDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const watcherTime = new WatcherTime(this.watcherId, new Date(crtDate));
    this.watcherDataService.getWatcherData(watcherTime).subscribe(res => {
      this.watcherData = res;
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }
}
