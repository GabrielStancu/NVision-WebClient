import { Component, Input, OnInit } from '@angular/core';
import { MeasurementReply } from 'src/app/replies/measurement.reply';

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

  constructor() { }

  ngOnInit(): void {
    this.fromIndex = 1;
    this.toIndex = this.measurements.length;
    this.displayData();
  }

  displayData(): void {
    if (!this.measurements || this.measurements.length === 0) {
      this.setEmptyData();
      return;
    }
    
    const color = this.generateColor();
    const start = this.fromIndex - 1;
    debugger;
    const measurementValues = this.measurements.slice(start, this.measurementsCount()).map(m => m.value);
    this.chartDatasets = [{
      data: measurementValues, label: this.measurements[0].sensorName, 
      fill: false, pointRadius: 2, borderColor: color
    }];
    this.chartLabels = this.measurements.slice(start, this.measurementsCount())
      .map(m => m.timestamp.toString().replace("T", " "));
    this.chartColors = [
      { backgroundColor: color, borderWidth: 0 }
    ];
  }

  private setEmptyData(): void {
    const color = this.generateColor();
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

  private generateColor(): string {
    const red = this.getRandomArbitrary(0, 255);
    const green = this.getRandomArbitrary(0, 255);
    const blue = this.getRandomArbitrary(0,255);

    return 'rgba(' + red + ',' + green + ',' + blue + ',1)';
  }

  private getRandomArbitrary(min, max): number {
    return Math.floor((Math.random() * (max - min) + min));
  }

  public measurementsCount(): number {
    return this.toIndex - this.fromIndex + 1;
  }
}
