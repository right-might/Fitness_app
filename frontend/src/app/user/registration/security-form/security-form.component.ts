import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { UserSecurityReponsesService } from "../service/user-security-responses.service";
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
 

@Component({
  selector: 'app-security-form',
  standalone: true,
  templateUrl: './security-form.component.html',
  styleUrls: ['./security-form.component.css'], 
  imports:[ReactiveFormsModule,CommonModule,NgIf]
})  
export class SecurityFormComponent implements OnInit  { 
  
  @Output() form = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private userSecurityReponses: UserSecurityReponsesService ) { }
  

  ngOnInit(): void {} 
 
  securityForm = this.formBuilder.group({
    reponse1: ['', Validators.required],
    reponse2: ['', Validators.required],
    reponse3: ['', Validators.required],
  }); 

  showMissing(controlName: string) {
    const control = this.securityForm.get(controlName);
    return control?.hasError("required") && (control?.dirty || control?.touched);
  }
  
  onCreate() { 
    console.log("reponse1: ", this.securityForm.value.reponse1);
    console.log("reponse2: ", this.securityForm.value.reponse2); 
    console.log("reponse3: ", this.securityForm.value.reponse3);
    if (this.securityForm.valid && (this.securityForm.value.reponse1 != null && this.securityForm.value.reponse2 != null
      && this.securityForm.value.reponse3 != null)) {
      this.userSecurityReponses.saveReponse1(this.securityForm.value.reponse1); 
      this.userSecurityReponses.saveReponse2(this.securityForm.value.reponse2);
      this.userSecurityReponses.saveReponse3(this.securityForm.value.reponse3);
      this.form.emit(this.securityForm.value);
      console.log("Form created")
    } else {
      this.securityForm.markAllAsTouched();
      console.log("Form errone")
    }
  }
} 

