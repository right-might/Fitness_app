import { Component } from "@angular/core";
import { AuthenticationService } from "../../../authentification.service";
import { UserNewAccount } from "../../model/user-registration";
import { Router } from "@angular/router";
import { RegistrationFormComponent } from "../../registraition-form/registration-form/registration-form.component";
import { RouterModule } from "@angular/router"; 
import { RouterOutlet } from "@angular/router"; 
  

@Component({
  selector: 'app-registration-page',
  imports : [RegistrationFormComponent],
  standalone : true,
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.scss"],
})
export class RegistrationPageComponent {
  createUserErrorMessage: string | null = null;
 
  constructor(  
    private authService: AuthenticationService,
    private router: Router
  ) {}
 
  async registerUser(newUserData: UserNewAccount) {
    try {
      await this.authService.createNewUser(newUserData);
      this.router.navigate(["user/register/security_questions"]);
    } catch (error) {
      this.createUserErrorMessage =
        "Erreur au niveau serveur, veuillez vérifier le nom ou l'email.";
    }  
  }
}
