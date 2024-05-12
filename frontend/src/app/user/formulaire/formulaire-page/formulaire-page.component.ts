import { FormulaireFormComponent } from "../formulaire-form/formulaire-form.component";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";
import { RouterOutlet } from "@angular/router";
import { AuthenticationService } from "../../authentification.service";
import { UserNewMessage } from "../model/user-message";
import { UserServiceService } from "../../profil/service/user-service.service";
import { UserProfile } from "../../profil/model/user-profile";

@Component({
  selector: "app-formulaire-page",
  standalone: true,
  imports: [FormulaireFormComponent],
  templateUrl: "./formulaire-page.component.html",
  styleUrl: "./formulaire-page.component.css",
})
export class FormulairePageComponent {
  userProfile: UserProfile | null = null;
  createUserErrorMessage: string | null = null;
  username: string | null = null;
  id: number | null = null;

  constructor(
    private authService: AuthenticationService,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUsername().subscribe((username) => {
      if (username) {
        this.username = username;
        console.log("bonjour");
        console.log(username);
        console.log(this.username);
        this.onGetUser();
      }
    });
  }

  onGetUser(): void {
    if (this.username) {
      this.userService.getUserByUsername(this.username).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
          this.id = userProfile.id;
          console.log(this.id);
          console.log(this.userProfile);
          console.log(this.userProfile.id);
        },
        (error) => {
          console.error("Failed to get user profile:", error);
        }
      );
    }
  }

  // async registerMessage(newUserData: UserNewMessage) {
  //   if (this.id !== null && this.id !== undefined) { // Vérification de nullité
  //     try {
  //       newUserData.id = this.id
  //       await this.authService.createMessage(newUserData);
  //       this.router.navigate(["user/profile/message"]);
  //     } catch (error) {
  //       this.createUserErrorMessage = "Erreur au niveau du serveur. Veuillez réessayer.";
  //     }
  //   } else {
  //     console.error("User ID not available.");
  //   }
  // }

  async registerMessage(newUserData: UserNewMessage) {
    try {
      if (this.id) {
        newUserData.user_id = this.id;
      }
      await this.authService.createMessage(newUserData);
      // Si la requête est réussie, vous pouvez effectuer des actions supplémentaires ici
      this.router.navigate([""]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);

      // Gérer les erreurs ici
    }
  }
}
