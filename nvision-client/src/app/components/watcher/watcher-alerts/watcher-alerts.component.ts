import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert.model';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';
import { WatcherDataService } from 'src/app/services/watcher-data.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-watcher-alerts',
  templateUrl: './watcher-alerts.component.html',
  styleUrls: ['./watcher-alerts.component.css']
})
export class WatcherAlertsComponent implements OnInit {

  constructor(private watcherDataService: WatcherDataService) { }

  collapsedSidebar = true;
  unfilteredAlerts: WatcherAlertReply[];
  alerts: WatcherAlertReply[];
  public chartType: string = 'polarArea';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: [],
      borderWidth: 0
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  dateRangeForm: FormGroup;
  private readonly millisecondsInDay = 86400000;

  ngOnInit(): void {
    this.watcherDataService.getWatcherAlerts(1).subscribe(alerts => {
      this.unfilteredAlerts = [];
      this.alerts = [];
      alerts.forEach(a => {
        const displayAlert = this.alertToDisplayAlert(a);
        this.unfilteredAlerts.push(displayAlert);
        this.alerts.push(displayAlert);
      });
      this.initChartData();
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    const startDate = Date.parse(dateRangeStart.value);
    const endDate = Date.parse(dateRangeEnd.value) + this.millisecondsInDay;

    this.alerts = this.unfilteredAlerts.filter(a => 
      Date.parse(a.timestamp.toString()) >= startDate && Date.parse(a.timestamp.toString()) <= endDate);
    this.unfilteredAlerts.forEach(ua => console.log(ua.timestamp));
    this.initChartData();
  }

  private alertToDisplayAlert(alert: Alert): WatcherAlertReply {
    return new WatcherAlertReply(alert.id, alert.subjectId, alert.subjectName, alert.message,
      alert.timestamp, alert.wasTrueAlert);
  }

  private initChartData(): void {
    this.initLabels();
    this.initValues();
    this.initColors();
    this.initDateRange();
  }

  private initLabels(): void {
    const subjectNames = this.getSubjectNames();
    this.chartLabels = subjectNames;
  }

  private initValues(): void {
    const subjectNames = this.getSubjectNames();
    const values: number[] = [];
    subjectNames.forEach(sn => values.push(this.alerts.filter(a => a.subjectName === sn).length));
    this.chartDatasets = [
      {data: values}
    ];
  }

  private initColors(): void {
    const subjectNames = this.getSubjectNames();
    const colors: string[] = [];
    subjectNames.forEach(_ => colors.push(this.generateColor()));
    const chartColors = { backgroundColor: colors, borderWidth: 0};
    this.chartColors = [chartColors];
  }

  private getSubjectNames(): string[] {
    return this.alerts.map(a => a.subjectName).filter((el, i, a) => i === a.indexOf(el));
  }

  private generateColor(): string {
    const red = this.getRandomArbitrary(0, 255);
    const green = this.getRandomArbitrary(0, 255);
    const blue = this.getRandomArbitrary(0,255);

    return 'rgba(' + red + ',' + green + ',' + blue + ',1)';
  }

  private getRandomArbitrary(min, max): number {
    return Math.floor((Math.random() * (max - min) + min));
  }

  private initDateRange(): void {
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.dateRangeForm = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day)),
    });
  }
}
