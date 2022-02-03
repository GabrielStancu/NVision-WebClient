import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';
import { AlertAnswer } from 'src/app/requests/alert-answer.request';
import { WatcherDataService } from 'src/app/services/watcher-data.service';
import { DisplayAlert } from '../display-models/display-alert.model';
import { AnswerAlertModalComponent } from './answer-alert-modal/answer-alert-modal.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(public dialog: MatDialog, private watcherDataService: WatcherDataService) { }

  @Input() alerts: WatcherAlertReply[];
  @Input() displayHeader = true;
  public displayAlerts: DisplayAlert[] = [];

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.alerts.forEach(a => {
        this.displayAlerts.push(
          new DisplayAlert(a.id, a.subjectName, a.message, a.timestamp,
                             this.getAlertStatus(a.wasTrueAlert), this.getClassNameByAccuracy(a.wasTrueAlert))
        );
    });
  }

  onRowClick(displayAlert: DisplayAlert): void {
    const alert = this.alerts.find(a => a.id === displayAlert.id);
    if (alert.wasTrueAlert === null) {
      const dialogRef = this.dialog.open(AnswerAlertModalComponent, {
        width: '350px',
        data: alert,
      });
      dialogRef.afterClosed().subscribe(alertAnswer => {
        this.answerAlert(alertAnswer);
      });
    }
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

  private answerAlert(alertData: WatcherAlertReply): void {
    const alert = this.displayAlerts.find(a => a.id === alertData.id);
    alert.status = this.getAlertStatus(alertData.wasTrueAlert);
    alert.className = this.getClassNameByAccuracy(alertData.wasTrueAlert);

    const alertAnswer = new AlertAnswer(alertData.id, alertData.wasTrueAlert);
    this.watcherDataService.answerAlert(alertAnswer).subscribe(_ => {});
  }
}
