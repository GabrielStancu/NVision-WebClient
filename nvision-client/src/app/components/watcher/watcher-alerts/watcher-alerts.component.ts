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
  public chartType: string = 'polarArea';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(219, 0, 0, 1)',
        'rgba(0, 165, 2, 1)',
        'rgba(255, 195, 15, 1)',
        'rgba(55, 59, 66, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      hoverBackgroundColor: [
        'rgba(219, 0, 0, 1)',
        'rgba(0, 165, 2, 1)',
        'rgba(255, 195, 15, 1)',
        'rgba(55, 59, 66, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  ngOnInit(): void {
    this.watcherDataService.getWatcherAlerts(1).subscribe(alerts => {
      this.alerts = [];
      alerts.forEach(a => this.alerts.push(this.alertToDisplayAlert(a)));
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  private alertToDisplayAlert(alert: Alert): WatcherAlertReply {
    return new WatcherAlertReply(alert.id, alert.subjectId, alert.subjectName, alert.message,
      alert.timestamp, alert.wasTrueAlert);
  }
}
