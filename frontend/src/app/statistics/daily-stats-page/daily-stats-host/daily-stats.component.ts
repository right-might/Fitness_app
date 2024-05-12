import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { ChartDataService } from './chart-data.service';
import { SelectorComponent } from '../selector/selector.component';
import { PerformanceChartComponent } from '../performance-chart/performance-chart.component';
PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-daily-stats',
  standalone: true,
  imports: [CommonModule, PlotlyModule, SelectorComponent, PerformanceChartComponent,],
  templateUrl: './daily-stats.component.html',
  styleUrls: ['./daily-stats.component.css']
})


export class DailyStatsComponent implements OnInit {
  public graph: any;
  public selectedDate = new Date(); // pour afficher la date actuelle

  constructor(private chartDataService: ChartDataService){}

  ngOnInit(): void {
    this.getChartData(''); // Type par défaut pour le démarrage
  }

  getChartData(type: string): void{
    this.chartDataService.getChartData(type).subscribe(data => {
      this.graph = data;
    });
  }

  onSelectionChanged(value: string): void{
    this.getChartData(value);
  }

  
}
