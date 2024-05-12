import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { CommonModule,NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserCredentials } from '../model/loginRequest';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router'


 
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgIf,RouterModule,RouterOutlet],  
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  @Output()
  formData = new EventEmitter<UserCredentials>();

  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {} 

  onLogin() {
    if (
      this.loginForm.valid &&
      this.loginForm.value.username &&
      this.loginForm.value.password
    ) {
      this.formData.emit({
        username: this.loginForm.value.username,

        password: this.loginForm.value.password,
      }); 
      
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showMissingUsername() {
    return this.showMissing("username");
  }

  showMissingPassword() {
    return this.showMissing("password");
  } 

  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    const toggleButton = document.getElementById(`toggle${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`); // Capitalize first letter of fieldId
    if (field.type === "password" && toggleButton?.innerHTML != null) {
        field.type = "text";
        toggleButton.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
    } else if (field.type !== "password" && toggleButton?.innerHTML != null) {
        field.type = "password";
        toggleButton.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
    }
} 

  private showMissing(controlName: string) {
    return (
      this.loginForm.get(controlName)?.hasError("required") &&
      (this.loginForm.get(controlName)?.dirty ||
        this.loginForm.get(controlName)?.touched)
    );
  }
}
