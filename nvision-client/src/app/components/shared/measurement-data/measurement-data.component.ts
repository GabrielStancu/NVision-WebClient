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

  constructor() { }

  ngOnInit(): void {
    this.displayData();
  }

  displayData(): void {
    if (!this.measurements || this.measurements.length === 0) {
      this.setEmptyData();
      return;
    }
      
    const measurementValues = this.measurements.map(m => m.value);
    this.chartDatasets = [{
      data: measurementValues, label: this.measurements[0].sensorName
    }];
    this.chartLabels = this.measurements.map(m => m.timestamp);
    this.chartColors = [
      { backgroundColor: this.generateColor(), borderWidth: 0 }
    ];
  }

  private setEmptyData(): void {
    this.chartDatasets = [{
      data: [], label: ''
    }];
    this.chartLabels = [];
    this.chartColors = [
      { backgroundColor: this.generateColor(), borderWidth: 0 }
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
}
