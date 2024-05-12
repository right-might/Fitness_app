import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-page-principale-entete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-principale-entete.component.html',
  styleUrl: './page-principale-entete.component.css'
})
export class PagePrincipaleEnteteComponent {
  today: Date = new Date();
  enteteCalendrier: string = "Calendrier d'activité";
}
