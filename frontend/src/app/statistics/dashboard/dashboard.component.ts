import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'; 

import * as PlotlyJS from "plotly.js-dist-min";
import { PlotlyModule } from "angular-plotly.js";

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: "app-dashboard",
  standalone: true,
  template:
    '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
  imports: [CommonModule, PlotlyModule,FormsModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
    nextWeekEnabled = false;
    previousWeekEnabled = true;
    comparaisonActive = false;
    selectedDays: string[] = [];
    daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    public annotations: any[] = [];

    public yValuesInitial: number[][] = [
    [2, 6, 3, 5, 4, 3, 5],  // Allure
    [3, 5, 4, 6, 5, 4, 6],  // Vitesse
    [2, 8, 6, 5, 7, 6, 7]   // Distance
  ];

  public yValuesNew: number[][] = [
    [1, 5, 2, 4, 3, 2, 4],  // Nouvelles valeurs pour Allure
    [2, 4, 3, 5, 4, 3, 5],  // Nouvelles valeurs pour Vitesse
    [3, 3, 4, 6, 5, 4, 6]   // Nouvelles valeurs pour Distance
  ];
  public graph = {
    data: [
      {
        x: [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ],
        y: this.yValuesInitial[0],
        type: "bar",
        name: "Allure",
        title: "Allure",
        text: "Allure",
        marker: { color: "navajowhite" },
      },
      {
        x: [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ],
        y: this.yValuesInitial[1],
        type: "bar",
        name: "Vitesse",
        title: "Vitesse",
        text: "Vitesse",
        marker: { color: "lightgreen" },
      },
      {
        x: [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ],
        y: this.yValuesInitial[2],
        type: "bar",
        name: "Distance",
        title: "Distance",
        text: "Distance",
        marker: { color: "#333333" },
      },
    ],
    layout: {
      responsive: true,
      width: 1300,
      height: 740,
      title: "Vue d'ensemble des données statistiques",
      margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
      paper_bgcolor: "lightblue",
      plot_bgcolor: "white",
      hovermode: "closest",
      xaxis: {
        title: "Journées",
        showgrid: true,
        zeroline: false,
        gridcolor: "ddd",
        zerolinecolor: "lightgrey",
        tickcolor: "orange",
      },
      yaxis: {
        title: "Distance/Temps (Km/min)",
        showline: false,
      },
      legend: {
        orientation: "h",
        x: 0.5,
        xanchor: "center",
        y: -0.3,
        yanchor: "top",
      },
      annotations: this.annotations
    },
  };

  retourSemaine() {
    this.nextWeekEnabled = true;
    this.previousWeekEnabled = false;
    // Mise à jour des valeurs affichées avec les nouvelles valeurs
    this.graph.data.forEach((serie, index) => {
      serie.y = this.yValuesNew[index];
    });
  }

  prochaineSemaine() {
    this.nextWeekEnabled = false;
    this.previousWeekEnabled = true;
    // Mise à jour des valeurs affichées avec les nouvelles valeurs
    this.graph.data.forEach((serie, index) => {
      serie.y = this.yValuesInitial[index];
    });
  }

  activerComparaison() {
    this.comparaisonActive = true;
  }

  comparerJours() {
    // Logique pour comparer les 2 jours sélectionnés
    let index1erJour = this.getIndexOfDay(this.selectedDays[0]);
    let index2eJour = this.getIndexOfDay(this.selectedDays[1]);
    let allure1, vitesse1, distance1, allure2, vitesse2, distance2;

    if (this.nextWeekEnabled == false) {
      allure1 = this.yValuesInitial[0][index1erJour];
      vitesse1 = this.yValuesInitial[1][index1erJour];
      distance1 = this.yValuesInitial[2][index1erJour];

      allure2 = this.yValuesInitial[0][index2eJour];
      vitesse2 = this.yValuesInitial[1][index2eJour];
      distance2 = this.yValuesInitial[2][index2eJour];
    } else {
      allure1 = this.yValuesNew[0][index1erJour];
      vitesse1 = this.yValuesNew[1][index1erJour];
      distance1 = this.yValuesNew[2][index1erJour];

      allure2 = this.yValuesNew[0][index2eJour];
      vitesse2 = this.yValuesNew[1][index2eJour];
      distance2 = this.yValuesNew[2][index2eJour];
    }

    // Calcul des pourcentages de différence
    const pourcentageAllure = Math.round(((allure2 - allure1) / allure1) * 100);
    const pourcentageVitesse = Math.round(((vitesse2 - vitesse1) / vitesse1) * 100);
    const pourcentageDistance = Math.round(((distance2 - distance1) / distance1) * 100);

    // Déterminer la couleur en fonction du signe du pourcentage
    const textColorAllure = pourcentageAllure >= 0 ? 'green' : 'red';
    const textColorVitesse = pourcentageVitesse >= 0 ? 'green' : 'red';
    const textColorDistance = pourcentageDistance >= 0 ? 'green' : 'red';

    // Ajout des annotations pour chaque mesure
    this.annotations = [
      { x: index2eJour - 0.27, y: allure2 + 0.2, text: `${pourcentageAllure}%`, showarrow: true, arrowhead: 3, ax: 0, ay: -40,arrowcolor: textColorAllure, font: { color: textColorAllure }},
      { x: index2eJour, y: vitesse2 + 0.2, text: `${pourcentageVitesse}%`, showarrow: true, arrowhead: 3, ax: 0, ay: -40,arrowcolor: textColorVitesse, font: { color: textColorVitesse }},
      { x: index2eJour + 0.27, y: distance2 + 0.2, text: `${pourcentageDistance}%`, showarrow: true, arrowhead: 3, ax: 0, ay: -40,arrowcolor:textColorDistance, font: { color: textColorDistance }}
    ];



    // Mettre à jour les annotations dans l'objet graph
    this.graph.layout.annotations = this.annotations;
    this.comparaisonActive = false; // Désactiver la comparaison
  }

toggleSelection(event: any) {
  const day = event.target.value; // Extraire la valeur de la case à cocher
  if (this.selectedDays.includes(day)) {
    // Si le jour est déjà sélectionné, le supprimer
    this.selectedDays = this.selectedDays.filter(selectedDay => selectedDay !== day);
  } else {
    // Sinon, ajouter le jour à la liste des jours sélectionnés
    if (this.selectedDays.length < 2) {
      this.selectedDays.push(day);
    }
  }
}

isSelected(day: string): boolean {
  return this.selectedDays.includes(day);
}

// Méthode pour obtenir l'index d'un jour sélectionné
getIndexOfDay(day: string): number {
  return this.daysOfWeek.indexOf(day);
}

}
