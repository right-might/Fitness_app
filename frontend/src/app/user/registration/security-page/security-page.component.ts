import { Component } from '@angular/core'; 
import { RouterModule } from "@angular/router"; 
import { RouterOutlet } from "@angular/router"; 
import { AuthenticationService } from "../../authentification.service";
import { Router } from "@angular/router";
import { SecurityFormComponent} from "../security-form/security-form.component"
import { UserDataService } from '../service/user-data.service';  
import { UserSecurityReponsesService } from "../service/user-security-responses.service";
import { UserNewSecurity } from "../model/user-security"; 

 
@Component({
  selector: 'app-security-page',
  standalone: true,
  imports: [SecurityFormComponent],
  templateUrl: './security-page.component.html',
  styleUrl: './security-page.component.css'
}) 
export class SecurityPageComponent { 
  createUserErrorMessage: string | null = null; 
  userEmail: string = ''; 
  reponse1: string = '';
  reponse2: string = '';
  reponse3: string = ''; 
  id: number = 0;
 
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userDataService: UserDataService,
    private userSecurityReponsesService: UserSecurityReponsesService
  ) {} 
 
  ngOnInit(): void {
    // Récupérez l'email en utilisant la méthode getEmail()
    this.userEmail = this.userDataService.getEmail();  
     
    //recuperer les questions de securite 
    this.reponse1 = this.userSecurityReponsesService.getReponse1(); 
    this.reponse2 = this.userSecurityReponsesService.getReponse2();
    this.reponse3 = this.userSecurityReponsesService.getReponse3();
    const userSecurity: UserNewSecurity = {
      id: this.id,
      reponse1: this.reponse1,
      reponse2: this.reponse2,
      reponse3: this.reponse3,
    };
  }     
  
  async registerSecurityAnswers(userSecurity: UserNewSecurity){
    userSecurity.id = await this.authService.getUserId(this.userEmail);
     
    console.log('User security data: ', userSecurity.id); 
    try {
      await this.authService.registerSecurity(userSecurity);
      this.router.navigate(["user/register/confirmation"]);
    } catch (error) {
      this.createUserErrorMessage =
        "Erreur au niveau serveur.";
    } 
     

  } 

 

}
 