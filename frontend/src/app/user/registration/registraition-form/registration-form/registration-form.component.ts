import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
import { UserDataService } from '../../service/user-data.service';
import { RegistrationDataService } from '../../../confirmation/confirmation-data.service';
@Component({
  selector: 'app-registration-form',
  standalone: true, 
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  imports:[ReactiveFormsModule,CommonModule,NgIf]
})
export class RegistrationFormComponent implements OnInit {
  @Output() form= new EventEmitter<any>();
  

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private registrationDataService: RegistrationDataService
  ) { }

  ngOnInit(): void {}

    registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', Validators.required]
    });
  
    validateDateOfBirth(control: any): any {
      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
    
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Si l'anniversaire n'est pas encore passé cette année, réduire l'âge d'une année
      }
    
      if (age < 18) {
        return { underage: true };
      }
    
      return null;
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

  onCreate() {
    if (this.registrationForm.valid && this.registrationForm.value.email != null) {
      this.userDataService.saveEmail(this.registrationForm.value.email);
      this.form.emit(this.registrationForm.value); 
      this.registrationDataService.setUserData(this.registrationForm.value);
      console.log("Form created")
    } else {
      this.registrationForm.markAllAsTouched();
      console.log("Form errone")

    }
  } 


  
  showMissing(controlName: string) {
    const control = this.registrationForm.get(controlName);
    return control?.hasError("required") && (control?.dirty || control?.touched);
  }


  isEmailInvalid() {
    const emailControl = this.registrationForm.get('email');
    return emailControl?.invalid && (emailControl?.dirty || emailControl?.touched);
  }

  isPasswordWeak() {
    const passwordControl = this.registrationForm.get('password');
    return passwordControl?.invalid && passwordControl?.hasError('minlength');
  }


}
