import { Component } from '@angular/core';
import { WeekSummaryComponent } from '../week-summary/week-summary.component';
import { DailyStatsComponent } from '../../daily-stats-page/daily-stats-host/daily-stats.component';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [WeekSummaryComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  current_pace: number = 0;
  min_pace: number = 0;
  max_pace: number = 0;
  moy_pace: number = 0;

  current_speed: number = 0;
  min_speed: number = 0;
  max_speed: number = 0;
  moy_speed: number = 0;

  activity_course: string = 'Course';
  activity_walk: string = 'Marche';
}
