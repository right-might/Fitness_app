import { Component, Input, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  template: '<div #chart style="width: 100%; height: 100%;"></div>',
})
export class PerformanceChartComponent implements OnChanges{
  @Input() chartData: any;
  @ViewChild('chart', {static: true}) chart?: ElementRef<HTMLDivElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if('chartData' in changes){
      this.updateChart();
    }
  }

  private updateChart(): void{
    if(this.chart && this.chart.nativeElement){
      PlotlyJS.newPlot(this.chart.nativeElement, this.chartData.data, this.chartData.layout);
    }
  }

}
