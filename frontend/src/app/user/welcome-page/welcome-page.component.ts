import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentification.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class WelcomePageComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isConnected();
  }
}
