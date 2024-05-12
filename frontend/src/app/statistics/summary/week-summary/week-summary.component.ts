import { Component } from '@angular/core';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

@Component({
  selector: 'app-week-summary',
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.scss', '../summary-host/summary.component.scss']
})
export class WeekSummaryComponent {
  current_pace: number = 0;
  min_pace: number = 0;
  max_pace: number = 0;
  moy_pace: number = 0;

  current_speed: number = 0;
  min_speed: number = 0;
  max_speed: number = 0;
  moy_speed: number = 0;

  activity_title_course: string = 'Course';
  activity_title_walk: string = 'Marche';
}
