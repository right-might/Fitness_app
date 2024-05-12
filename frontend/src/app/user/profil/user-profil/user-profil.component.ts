import { Component, OnInit, ViewChild } from "@angular/core";

import { AuthenticationService } from "../../authentification.service";
import { UserProfile } from "../model/user-profile";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { CommonModule } from "@angular/common";
import { UserServiceService } from "../service/user-service.service";
import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-user-profil",
  templateUrl: "./user-profil.component.html",
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent],
  styleUrls: ["./user-profil.component.css"],
})
export class UserProfilComponent implements OnInit {
  userProfile: UserProfile | null = null;
  username: string | null = null;
  userId: number | null = null;
  @ViewChild(ConfirmationModalComponent)
  confirmModal: ConfirmationModalComponent | null = null;

  constructor(
    private authService: AuthenticationService,
    private userService: UserServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.isConnected()) {
      this.onGetUser();
    }
  }

  onGetUser(): void {
    this.authService.getId().subscribe((id) => {
      this.userId = id;
      if (this.userId) {
        this.userService.getUser(this.userId).subscribe(
          (userProfile) => {
            this.userProfile = userProfile;
            this.username = this.userProfile.username;
          },
          (error) => {
            console.error("Failed to get user profile:", error);
          }
        );
      }
    });
  }

  onDeleteAccount(): void {
    if (this.userId) {
      this.authService.logoutUser();
      this.userService.deleteUser(this.userId).subscribe(
        () => {
          this.router.navigate(["/"]);
        },
        (error) => {
          this.router.navigate(["/"]);

          console.error("Failed to delete user account:", error);
        }
      );
    }
  }

  onBecomeTrainer(): void {
    if (this.username) {
      console.log(this.username);
      this.userService.becomeTrainer(this.username).subscribe(
        (userProfile) => {
          this.router.navigate(["/"]);

          this.userProfile = userProfile;
        },
        (error) => {
          console.error("Failed to become trainer:", error);
        }
      );
    }
  }

  onBecomeTrainerr() {
    if (this.confirmModal) {
    } else {
      console.log("erreur ");
    }
  }

  onFindTrainer(): void {
    this.router.navigate(["/trainers"]);
  }

  onViewAppointments(): void {}
  onScheduleAppointments(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "saved") {
        this.onBecomeTrainer();
        console.log("Action confirmed");
      } else {
        console.log("Action cancelled");
      }
    });
  }
}
