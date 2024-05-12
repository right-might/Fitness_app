import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { CommonModule,NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserDataService } from '../../registration/service/user-data.service';  
import { AuthenticationService } from "../../authentification.service";
import { UserRenewPassword } from "../model/UserRenewPassword";

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgIf,RouterModule,RouterOutlet],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css'
})
export class ResetPasswordFormComponent { 
  @Output() form= new EventEmitter<any>();  

  userEmail: string = '';  
   


  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private authService: AuthenticationService,
  ) { }  

  resetPasswordForm = this.formBuilder.group({ 
    newPassword: ['', [Validators.required]],
    confirmNewPassword: ['', Validators.required],
  }) 

  showMissingNewPassword(): boolean {
    return false;
  }  

  showMissingConfirmNewPassword(): boolean{
    return false;
  } 

  ngOnInit() { 
    this.userEmail = this.userDataService.getEmail();
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', Validators.required],
      
    });  
  }     
  
  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    const toggleButton = document.getElementById(`toggle${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`); // Capitalize first letter of fieldId
    if (field.type === "password" && toggleButton != null) {
        field.type = "text";
        toggleButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
    } else if (field.type !== "password" && toggleButton != null) {
        field.type = "password";
        toggleButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
    }
  }

  async onCreate() {
    if (this.resetPasswordForm.valid && (this.resetPasswordForm.value.newPassword == this.resetPasswordForm.value.confirmNewPassword )) {  
      
      const renewUserPassword: UserRenewPassword = {
        email: this.userEmail,
        newPassword: this.resetPasswordForm.value.newPassword
      }; 

      this.form.emit(renewUserPassword); 
      console.log("Form created");
      
    } else {
      this.resetPasswordForm.markAllAsTouched();
      console.log("Form erroné");
    }
  } 

}
