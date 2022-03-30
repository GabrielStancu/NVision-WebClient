import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';
import { AlertAnswer } from 'src/app/requests/alert-answer.request';
import { WatcherDataService } from 'src/app/services/watcher-data.service';
import { DisplayAlert } from '../display-models/display-alert.model';
import { AnswerAlertModalComponent } from './answer-alert-modal/answer-alert-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AlertsComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(public dialog: MatDialog, private watcherDataService: WatcherDataService,
              private datePipe: DatePipe) { }

  @Input() alerts: WatcherAlertReply[];
  @Input() displayHeader = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayAlerts: DisplayAlert[] = [];
  public dataSource = new MatTableDataSource<DisplayAlert>(this.displayAlerts);

  public columnsToDisplay = ['subjectName', 'shortMessage', 'displayDate', 'status'];
  public columnsDisplayValues: {[key: string]: string} = {
    subjectName: 'Subject Name',
    shortMessage: 'Message',
    displayDate: 'Date',
    status: 'Was Accurate'
  };
  expandedElement: DisplayAlert | null;

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.initTable();
  }

  initTable(): void {
    this.displayAlerts = [];
    this.alerts.forEach(a => {
        let shortMessage = a.message;
        if (shortMessage.length > 30) {
          shortMessage = shortMessage.substring(0, 30) + '...'
        };

        let displayDate = this.datePipe.transform(a.timestamp, 'dd.MM.yyyy HH:mm:ss');
        this.displayAlerts.push(
          new DisplayAlert(a.id, a.subjectName, a.message, a.timestamp,
                           this.getAlertStatus(a.wasTrueAlert), this.getClassNameByAccuracy(a.wasTrueAlert),
                           shortMessage, displayDate)
        );
    });
    this.dataSource = new MatTableDataSource<DisplayAlert>(this.displayAlerts);
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
    if (!alertData)
      return;

    const alert = this.displayAlerts.find(a => a.id === alertData.id);
    alert.status = this.getAlertStatus(alertData.wasTrueAlert);
    alert.className = this.getClassNameByAccuracy(alertData.wasTrueAlert);

    const alertAnswer = new AlertAnswer(alertData.id, alertData.wasTrueAlert);
    this.watcherDataService.answerAlert(alertAnswer).subscribe(_ => {});
  }
}
