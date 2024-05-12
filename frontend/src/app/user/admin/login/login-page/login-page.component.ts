import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginFormComponent } from "../login-form/login-form.component";
import { AuthenticationService } from "../../../authentification.service";
import { Router } from "@angular/router";
import { UserCredentials } from "../../../login/model/loginRequest";
import { AdminLoginRequest } from "../../model/model";
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RouterOutlet } from "@angular/router";
import { AdminService } from "../../admin.service";

@Component({
  selector: "app-login-page1",
  standalone: true,
  imports: [LoginFormComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.css",
})
export class LoginAdminPageComponent {
  loginErrorMessage: string | null = null;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {}

  async onLogin(userCredentials: AdminLoginRequest) {
    this.loginErrorMessage = null;
    try {
      await this.adminService.authenticateAdmin(userCredentials);
      this.router.navigate(["admin"]);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.loginErrorMessage =
            "Nom d'utilisateur ou mot de passe incorrect.";
        } else if (error.status === 500) {
          this.loginErrorMessage =
            "Problème au niveau du serveur, veuillez réessayer.";
        } else {
          this.loginErrorMessage =
            "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
        }
      } else {
        console.error("Erreur lors de la connexion :", error);
        this.loginErrorMessage =
          "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
      }
    }
  }
}
