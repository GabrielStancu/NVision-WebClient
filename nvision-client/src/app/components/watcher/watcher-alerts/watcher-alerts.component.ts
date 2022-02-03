import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert.model';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';
import { WatcherDataService } from 'src/app/services/watcher-data.service';

@Component({
  selector: 'app-watcher-alerts',
  templateUrl: './watcher-alerts.component.html',
  styleUrls: ['./watcher-alerts.component.css']
})
export class WatcherAlertsComponent implements OnInit {

  constructor(private watcherDataService: WatcherDataService) { }

  collapsedSidebar = true;
  alerts: WatcherAlertReply[];

  ngOnInit(): void {
    this.watcherDataService.getWatcherAlerts(1).subscribe(alerts => {
      this.alerts = [];
      alerts.forEach(a => this.alerts.push(this.alertToDisplayAlert(a)));
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  private alertToDisplayAlert(alert: Alert): WatcherAlertReply {
    return new WatcherAlertReply(alert.id, alert.subjectId, alert.subjectName, alert.message,
      alert.timestamp, alert.wasTrueAlert);
  }
}
