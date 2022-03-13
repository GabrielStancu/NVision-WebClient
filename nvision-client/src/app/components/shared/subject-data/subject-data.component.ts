import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorType } from 'src/app/models/sensor-type.enum';
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
  public measurementTypes = [
    { displayValue: 'Temperature', backValue: SensorType.Temperature},
    { displayValue: 'Electrocardiogram (ECG)', backValue: SensorType.ECG},
    { displayValue: 'Pulse (BPM)', backValue: SensorType.Pulse},
    { displayValue: 'Oxygen Saturation (SpO2)', backValue: SensorType.OxygenSaturation},
    { displayValue: 'Galvanic Skin Response (GSR)', backValue: SensorType.GSR}
  ]

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
    
  }

  private getInitialData(): void {
    const sensorTypes = [SensorType.ECG, SensorType.Pulse];
    var startDate = new Date(2022, 2, 12);
    var endDate = new Date(2022, 2, 18);
    var request = new FilteredSubjectDataRequest(this.subjectId, sensorTypes, startDate, endDate);
    this.subjectService.getMeasurementsData(request).subscribe(rep => {
      console.log(rep);
    })
  }
}
