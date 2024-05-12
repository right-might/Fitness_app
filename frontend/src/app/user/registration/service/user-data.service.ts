// user-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Assurez-vous que le service est disponible globalement
})
export class UserDataService {
  private userEmail: string = ''; // Variable pour stocker l'email

  constructor() {}

  // Méthode pour enregistrer l'email
  saveEmail(email: string): void {
    this.userEmail = email;
  }

  // Méthode pour récupérer l'email
  getEmail(): string {
    return this.userEmail;
  }
}
