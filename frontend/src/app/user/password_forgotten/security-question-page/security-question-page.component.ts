import { NgModule } from '@angular/core';
import { SecurityQuestionFormComponent } from '../security-question-form/security-question-form.component'
import { Component } from '@angular/core'; 
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router"; 
import { RouterOutlet } from "@angular/router"; 
import { AuthenticationService } from '../../authentification.service';
import { UserNewPassword} from '../model/UserNewPassword';
import { UserServiceService } from '../../profil/service/user-service.service';


@Component({
  selector: 'app-security-question-page',
  standalone: true,
  imports: [SecurityQuestionFormComponent],
  templateUrl: './security-question-page.component.html',
  styleUrl: './security-question-page.component.css'
})
export class SecurityQuestionPageComponent { 
  
  
  constructor(
    private authService: AuthenticationService, 
    private userService: UserServiceService,
    private router: Router
  ) {}  

  async validateSecurityQuestion(newUserData: UserNewPassword){
    try { 
      await this.authService.validateSecurityQuestion(newUserData);
      this.router.navigate(['user/register/reset_password']);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      // Gérer les erreurs ici
    }
  } 

}
