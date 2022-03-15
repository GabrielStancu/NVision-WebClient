import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SensorType } from 'src/app/models/sensor-type.enum';
import { MeasurementReply } from 'src/app/replies/measurement.reply';
import { SummarizedSubjectReply } from 'src/app/replies/summarized-subject.reply';
import { FilteredSubjectDataRequest } from 'src/app/requests/filtered-subject-data.request';
import { SubjectDataService } from 'src/app/services/subject-data.service';

@Component({
  selector: 'app-subject-data',
  templateUrl: './subject-data.component.html',
  styleUrls: ['./subject-data.component.css']
})
export class SubjectDataComponent implements OnInit {

  collapsedSidebar = true;
  public startDate: Date;
  public endDate: Date;
  measurementTypesFilter = new FormControl();
  public openMeasurementTypesFilterSelect: boolean;
  public measurementTypes = [
    { displayValue: 'Temperature', backValue: SensorType.Temperature},
    { displayValue: 'Electrocardiogram (ECG)', backValue: SensorType.ECG},
    { displayValue: 'Pulse (BPM)', backValue: SensorType.Pulse},
    { displayValue: 'Oxygen Saturation (SpO2)', backValue: SensorType.OxygenSaturation},
    { displayValue: 'Galvanic Skin Response (GSR)', backValue: SensorType.GSR}
  ];
  public subject: SummarizedSubjectReply;
  public measurements = [];

  private subjectId: number;

  constructor(private route: ActivatedRoute, private subjectService: SubjectDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subjectId = params['id'];
    });
    this.getInitialData();
  }

  onSidebarChanged(sidebarOption: {collapsed: boolean}): void {
    this.collapsedSidebar = sidebarOption.collapsed;
  }

  public dateRangeChange() {
    if (this.startDate !== null && this.endDate !== null) {
      this.displayFetchedData();
    }
  }

  public onDateRangeReset() {
    this.setDate();
  }

  measurementTypeComboChange(event) {
    this.openMeasurementTypesFilterSelect = false;
    if(!event) {
      this.openMeasurementTypesFilterSelect = true;
      this.displayFetchedData();
    }
  }

  private getInitialData(): void {
    this.measurementTypesFilter.setValue([SensorType.ECG, SensorType.GSR, SensorType.OxygenSaturation, SensorType.Pulse, SensorType.Temperature]);
    this.setDate();
    this.displayFetchedData();
  }

  private displayFetchedData(): void {
    var request = new FilteredSubjectDataRequest(this.subjectId, this.measurementTypesFilter.value, this.startDate, this.endDate);
    this.subjectService.getMeasurementsData(request).subscribe(rep => {
      this.displaySubjectSummarizedData(rep.summarizedDataDto);
      this.measurementTypesFilter.value.forEach(sensorType => {
        const filteredMeasurements = rep.measurements.filter(m => m.sensorType == sensorType);
        this.displayMeasurementData(filteredMeasurements);
      });
    })
  }

  private setDate(): void {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - 7);
  }

  private displaySubjectSummarizedData(subjectData: SummarizedSubjectReply): void {
    this.subject = subjectData;
  }

  private displayMeasurementData(measurements: MeasurementReply[]): void {
    this.measurements.push(measurements);
  }
}
