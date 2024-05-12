import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { AdminLoginRequest } from '../../model/model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    id: [null, Validators.required], // Utiliser null au lieu de "" pour un champ de type number
    password: ["", Validators.required],
  });

  @Output() formData = new EventEmitter<AdminLoginRequest>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      const idString = this.loginForm.value.id;
      const passwordString = this.loginForm.value.password;

      if (idString !== null && idString !== undefined) {
        const id = parseInt(idString);

        if (!isNaN(id)) {
          if (passwordString){
            const password=parseInt( passwordString)
            this.formData.emit({ id, password });

          }
        } else {
          console.error("ID should be a valid number");
        }
      } else {
        console.error("ID cannot be null or undefined");
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showMissingId() {
    return this.showMissing("id");
  }

  showMissingPassword() {
    return this.showMissing("password");
  }

  private showMissing(controlName: string) {
    return (
      this.loginForm.get(controlName)?.hasError("required") &&
      (this.loginForm.get(controlName)?.dirty ||
        this.loginForm.get(controlName)?.touched)
    );
  }
}
