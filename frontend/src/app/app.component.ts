import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummaryComponent } from './statistics/summary/summary-host/summary.component';
import { WeekSummaryComponent } from './statistics/summary/week-summary/week-summary.component';
import { BarChartComponent } from './statistics/summary/bar-chart/bar-chart.component';
import { LayoutComponent } from './layout/layout.component';
import { PageDactiviteScrolldownmenuComponent } from './statistics/page-dactivite-scrolldownmenu/page-dactivite-scrolldownmenu.component';
import { LanguageService } from './activity/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, LayoutComponent, SummaryComponent, WeekSummaryComponent, BarChartComponent,PageDactiviteScrolldownmenuComponent],
})
export class AppComponent {
  title = 'GymGenius';

  constructor(
    private languageService: LanguageService
  ) { }
}
