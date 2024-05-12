import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Définir un type pour les activités
type Activities = {
  Toutes: string[];
  Marche: string[];
  Vélo: string[];
  Course: string[];
};

@Component({
  selector: "app-page-dactivite-scrolldownmenu",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./page-dactivite-scrolldownmenu.component.html",
  styleUrl: "./page-dactivite-scrolldownmenu.component.css",
})
export class PageDactiviteScrolldownmenuComponent {
  commentForMarche = "";
  commentForVelo = "";
  commentForCourse = "";
  comments: { [key: string]: string } = {};
  isDropdownOpen = false;
  selectedActivity: keyof Activities = "Toutes";

  // Utiliser le type défini pour les activités
  activities: Activities = {
    Toutes: [],
    Marche: ["Marche Parc Jarry 12h-12h30"],
    Vélo: ["Vélo Mont-Royal 4h-5h"],
    Course: ["Course Parc Maisonneuve 21h-21h30"],
  };

  updateComment(activity: keyof Activities) {
    switch (activity) {
      case "Marche":
        this.commentForMarche = this.comments["Marche"];
        this.comments["Marche"] = "";
        break;
      case "Vélo":
        this.commentForVelo = this.comments["Velo"];
        this.comments["Velo"] = "";
        break;
      case "Course":
        this.commentForCourse = this.comments["Course"];
        this.comments["Course"] = "";
        break;
      default:
        break;
    }
  }

  constructor() {
    this.activities.Toutes = [
      ...this.activities.Marche,
      ...this.activities.Vélo,
      ...this.activities.Course,
    ];
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectActivity(activity: string) {
    this.selectedActivity = activity as keyof Activities;
    this.isDropdownOpen = false;
    // Ajoutez ici la logique en fonction de l'activité sélectionnée
  }
}
