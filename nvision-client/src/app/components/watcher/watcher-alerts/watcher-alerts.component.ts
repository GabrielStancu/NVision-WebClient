import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert.model';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';
import { WatcherDataService } from 'src/app/services/watcher-data.service';
import {FormGroup, FormControl} from '@angular/forms';
import { Filter } from 'src/app/helpers/filters/filter.implem';
import { MultiFieldSpecification } from 'src/app/helpers/specifications/multi-field.specification';
import { ISpecification } from 'src/app/helpers/specifications/specification.interface';
import { AlertDateSpecification } from 'src/app/helpers/specifications/alerts-specification/alert-date.specification';
import { AlertTypeSpecification } from 'src/app/helpers/specifications/alerts-specification/alert-type.specification';
import { AlertSubjectSpecification } from 'src/app/helpers/specifications/alerts-specification/alert-subject.specification';

@Component({
  selector: 'app-watcher-alerts',
  templateUrl: './watcher-alerts.component.html',
  styleUrls: ['./watcher-alerts.component.css']
})
export class WatcherAlertsComponent implements OnInit {

  constructor(private watcherDataService: WatcherDataService) { }

  collapsedSidebar = true;
  unfilteredAlerts: Alert[];
  alerts: Alert[];
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

  public startDate = "";
  public endDate = "";
  alertTypesFilter = new FormControl();
  subjectNamesFilter = new FormControl();
  public openAlertTypesFilterSelect: boolean;
  public openSubjectNamesFilterSelect: boolean;
  public alertsDataReady = false;

  private alertsFilter = new Filter<Alert>();

  public alertTypes = [
    { displayValue: 'All Alerts', backValue: 'all'},
    { displayValue: 'Positive Alerts', backValue: 'yes'},
    { displayValue: 'Negative Alerts', backValue: 'no'},
    { displayValue: 'Not Known Alerts', backValue: 'na'}
  ]

  public subjectNames: string[] = ['All Subjects'];
  private readonly watcherId = Number(localStorage.getItem('nvision-userId'));

  ngOnInit(): void {
    this.watcherDataService.getWatcherAlerts(this.watcherId).subscribe(alerts => {
      this.unfilteredAlerts = [];
      this.alerts = [];
      alerts.forEach(a => {
        this.unfilteredAlerts.push(a);
        this.alerts.push(a);
      });
      this.subjectNames = this.subjectNames.concat(this.getSubjectNames());
      this.initChartData();
    });
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public dateRangeChange() {
    this.alerts = this.alertsFilter.filter(this.unfilteredAlerts, this.buildAlertSpecification());
    this.initChartData();
  }

  public onDateRangeReset(): void {
    this.startDate = null;
    this.endDate = null;
    this.alerts = this.alertsFilter.filter(this.unfilteredAlerts, this.buildAlertSpecification());
    this.initChartData();
  }

  subjectNameComboChange(event) {
    this.openSubjectNamesFilterSelect = false;
    if(!event) {
      this.openSubjectNamesFilterSelect = true;
      this.alerts = this.alertsFilter.filter(this.unfilteredAlerts, this.buildAlertSpecification());
      this.initChartData();
    }
  }

  alertTypeComboChange(event) {
    this.openAlertTypesFilterSelect = false;
    if(!event) {
      this.openAlertTypesFilterSelect = true;
      this.alerts = this.alertsFilter.filter(this.unfilteredAlerts, this.buildAlertSpecification());
      this.initChartData();
    }
  }

  private initChartData(): void {
    this.initLabels();
    this.initValues();
    this.initColors();
    this.alertsDataReady = true;
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

  private buildAlertSpecification(): MultiFieldSpecification<Alert> {
    const specifications: ISpecification<Alert>[] = [];

    if (this.startDate !== null && this.endDate !== null) {
      const parsedStartDate = new Date(this.startDate);
      const parsedEndDate = new Date(new Date(this.endDate).getTime() + (1000 * 60 * 60 * 24));
      specifications.push(new AlertDateSpecification(parsedStartDate, parsedEndDate));
    }

    if (this.alertTypesFilter.value !== null) {
      const selectedValues = (this.alertTypesFilter.value && this.alertTypesFilter.value.toString()).toString();
      if (selectedValues.includes('all')) {
        specifications.push(new AlertTypeSpecification('all'))
      } else {
        specifications.push(new AlertTypeSpecification(selectedValues));
      }
    }
    
    if (this.subjectNamesFilter.value !== null) {
      const selectedValues = (this.subjectNamesFilter.value && this.subjectNamesFilter.value.toString()).toString();
      if (selectedValues.includes('All')) {
        specifications.push(new AlertSubjectSpecification('all'))
      } else {
        specifications.push(new AlertSubjectSpecification(selectedValues));
      }
    }
        
    return new MultiFieldSpecification(specifications);
  }
}
