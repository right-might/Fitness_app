import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
    selector: 'app-bar-chart',
    standalone: true,
    template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
    imports: [CommonModule, PlotlyModule],
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})

export class BarChartComponent {
    abcisse: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    ordinatePace: number[] = [2, 6, 3, 5, 7, 8, 5];
    ordinateSpeed: number[] = [6, 3, 2, 5, 8, 6, 9];
    dates: Date[] = [
        new Date('2024-03-24T00:00:00'), // Sunday
        new Date('2024-03-25T00:00:00'), // Monday
        new Date('2024-03-26T00:00:00'), // Tuesday
        new Date('2024-03-27T00:00:00'), // Wednesday
        new Date('2024-03-28T00:00:00'), // Thursday
        new Date('2024-03-29T00:00:00'), // Friday
        new Date('2024-03-30T00:00:00')  // Saturday
    ];

    public graph = {
        data: [
            { x: this.dates.map(date => this.getDayName(date)), y: this.ordinatePace, type: 'bar', name: 'Allure', title: 'Allure', text: this.dates.map(date => this.getFormattedDate(date)), marker: { color: 'hsl(202, 89%, 69%)' } },
            { x: this.dates.map(date => this.getDayName(date)), y: this.ordinateSpeed, type: 'bar', name: 'Vitesse', title: 'Vitesse', text: this.dates.map(date => this.getFormattedDate(date)), marker: { color: 'hsl(233, 75%, 68%)' } },
        ],
        layout: {
            responsive: true,
            width: 530,
            height: 400,
            title: 'Vue d\'ensemble des données statistiques de la semaine',
            margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
            padding: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
            paper_bgcolor: 'hsl(188, 46%, 84%)',
            plot_bgcolor: 'white',
            hovermode: 'closest',
            xaxis: {
                // title: 'Journées',
                showgrid: true,
                zeroline: false,
                gridcolor: 'ddd',
                zerolinecolor: 'lightgrey',
                tickcolor: 'orange'
            },
            yaxis: {
                title: 'Distance/Temps (Km/min)',
                showline: false
            },
            legend: {
                orientation: 'h',
                x: 0.5,
                xanchor: 'center',
                y: -0.3,
                yanchor: 'top'
            }
        }
    };

    getDayName(date: Date): string {
        return date.toLocaleDateString('fr-FR', { weekday: 'long' });
    }

    getFormattedDate(date: Date): string {
        return date.toLocaleDateString('fr-FR');
    }
}
