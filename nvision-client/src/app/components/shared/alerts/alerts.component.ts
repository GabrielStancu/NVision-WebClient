import { Component, Input, OnInit } from '@angular/core';
import { WatcherDashboardAlertReply } from 'src/app/replies/watcher-dashboard-data.reply';
import { DashboardAlert } from '../display-models/dashboard-alert.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor() { }

  @Input() alerts: WatcherDashboardAlertReply[];
  public dashboardAlerts: DashboardAlert[] = [];

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.alerts.forEach(a => {
      for (let i = 0; i < 5; i++) {
        this.dashboardAlerts.push(
          new DashboardAlert(a.subjectName, a.message, a.timestamp,
                             a.wasAccurate, this.getClassNameByAccuracy(a.wasAccurate))
        );
      }
    });
  }

  private getClassNameByAccuracy(wasAccurate: boolean): string {
    return wasAccurate ? 'delivered' : 'return';
  }
}
