import { Component } from '@angular/core'; 
import { ResetPasswordFormComponent } from "../reset-password-form/reset-password-form.component"
import { UserRenewPassword } from '../model/UserRenewPassword';
import { AuthenticationService } from "../../authentification.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ResetPasswordFormComponent],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent {
  constructor(
    private authService: AuthenticationService, 
    private router: Router
  ) {} 
 
  async registerNewPassword(newUserData: UserRenewPassword){
    try { 
      await this.authService.renewPassword(newUserData);
      this.router.navigate(['auth/login']);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      // Gérer les erreurs ici
    }
  }

}
