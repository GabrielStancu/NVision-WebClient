import { Component, Input, OnInit } from '@angular/core';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';
import { DisplayAlert } from '../display-models/display-alert.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor() { }

  @Input() alerts: WatcherAlertReply[];
  @Input() displayHeader = true;
  public displayAlerts: DisplayAlert[] = [];

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.alerts.forEach(a => {
        this.displayAlerts.push(
          new DisplayAlert(a.subjectName, a.message, a.timestamp,
                             this.getAlertStatus(a.wasTrueAlert), this.getClassNameByAccuracy(a.wasTrueAlert))
        );
    });
  }

  private getAlertStatus(wasTrueAlert: boolean|undefined): string {
    if (wasTrueAlert === null) {
      return 'N/A';
    }
    return wasTrueAlert ? 'Yes' : 'No';
  }

  private getClassNameByAccuracy(wasTrueAlert: boolean|undefined): string {
    if (wasTrueAlert === null) {
      return 'pending';
    }
    return wasTrueAlert ? 'delivered' : 'return';
  }
}
