import { Component, Input, OnInit } from '@angular/core';
import { MeasurementReply } from 'src/app/replies/measurement.reply';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-measurement-data',
  templateUrl: './measurement-data.component.html',
  styleUrls: ['./measurement-data.component.css']
})
export class MeasurementDataComponent implements OnInit {

  @Input() measurements: MeasurementReply[];
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
  public chartType = 'line';
  public fromIndex: number;
  public toIndex: number;
  public label = '';

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.measurements.length > 5000) {
      this.measurements = this.measurements.splice(this.measurements.length-5000);
    }
    this.fromIndex = 1;
    this.toIndex = this.measurements.length;
    this.displayData();
  }

  displayData(): void {
    if (!this.measurements || this.measurements.length === 0) {
      this.setEmptyData();
      return;
    }

    this.label = this.measurements[0].sensorName;
    
    const color = '#db3f3f';
    const start = this.fromIndex - 1;
    const end = this.toIndex - 1;
    const measurementValues = this.measurements.slice(start, end).map(m => m.value);
    this.chartDatasets = [{
      data: measurementValues, label: this.label, 
      fill: false, pointRadius: 2, borderColor: color
    }];
    this.chartLabels = this.measurements.slice(start, end)
      .map(m => {
        const date = new Date(m.timestamp.toString().replace("T", " ") + ' UTC');
        return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss:SSSS');
      }); 
    this.chartColors = [
      { backgroundColor: color, borderWidth: 0 }
    ];
  }

  private setEmptyData(): void {
    const color = '#db3f3f';
    this.chartDatasets = [{
      data: [], label: '', fill: false, pointRadius: 2, borderColor: color
    }];
    this.chartLabels = [];
    this.chartColors = [
      { backgroundColor: color, borderWidth: 0 }
    ];
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public measurementsCount(): number {
    const len = this.toIndex - this.fromIndex + 1; 
    return len;
  }
}
