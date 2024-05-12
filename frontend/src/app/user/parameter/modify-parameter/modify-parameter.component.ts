import { Component, OnInit } from "@angular/core";
import { UserProfile } from "../../profil/model/user-profile";
import { UserServiceService } from "../../profil/service/user-service.service";
import { CommonModule, NgIf } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationService } from "../../authentification.service";
import { Router, RouterModule } from '@angular/router';
import { ModificationDataService } from '../../confirmation-modification/confirmation-modification-data.service';

@Component({
  selector: "app-modify-parameter",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: "./modify-parameter.component.html",
  styleUrls: ["./modify-parameter.component.css"],
})
export class ModifyParameterComponent implements OnInit {
  userProfile: UserProfile | null = null;
  username: string | null = null;
  changesMade: boolean = false;
  saving: boolean = false;
  userId: number | null = null;

  constructor(
    private userService: UserServiceService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modificationDataService: ModificationDataService,
    private router: Router
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

            this.modifyForm.setValue({
              firstName: userProfile.firstName,
              lastName: userProfile.lastName,
              username: userProfile.username,
              email: userProfile.email,
              // Vous pouvez gérer les autres champs de saisie de la même manière
            });
          },
          (error) => {
            console.error("Failed to get user profile:", error);
          }
        );
      }
    });
  }

  onInputChange(): void {
    if (this.userProfile) {
      this.changesMade = true;
    }
  }

  modifyForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    username: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });

  showMissing(controlName: string) {
    const control = this.modifyForm.get(controlName);
    return (
      control?.hasError("required") && (control?.dirty || control?.touched)
    );
  }

  isEmailInvalid() {
    const emailControl = this.modifyForm.get("email");
    return (
      emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)
    );
  }

  onSave(): void {
    if (this.userProfile) {
      this.saving = true;
      const formData = this.modifyForm.value; // Extract form values
      // Vérifier et attribuer les valeurs du formulaire uniquement si elles ne sont pas null ou undefined
      if (formData.firstName !== null && formData.firstName !== undefined) {
        this.userProfile.firstName = formData.firstName;
      }
      if (formData.lastName !== null && formData.lastName !== undefined) {
        this.userProfile.lastName = formData.lastName;
      }
      if (formData.username !== null && formData.username !== undefined) {
        this.userProfile.username = formData.username;
      }
      if (formData.email !== null && formData.email !== undefined) {
        this.userProfile.email = formData.email;
      }

      this.userService.updateUser(this.userProfile).subscribe(
        () => {
          console.log("Successfully updated user profile");
          this.changesMade = false;
          this.saving = false;
          console.log(this.userProfile?.email, this.userProfile?.firstName);
          if (this.userProfile)
          this.authService.setUsername(this.userProfile.username)

          this.modificationDataService.setUserData(this.modifyForm.value);
          this.router.navigate(["user/register/confirmation-modification"]);
        },
        (error: any) => {
          console.error("Failed to update user profile:", error);
          this.saving = false;
        }
      );
    }
  }
}
