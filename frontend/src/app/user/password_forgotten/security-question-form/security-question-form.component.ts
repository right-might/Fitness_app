import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserNewPassword } from '../model/UserNewPassword';
import { UserDataService } from '../../registration/service/user-data.service';

@Component({
  selector: 'app-security-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './security-question-form.component.html',
  styleUrl: './security-question-form.component.css'
})
export class SecurityQuestionFormComponent {
  questions = ["Quel est le nom de ton/ta meilleur(e) ami(e) d'enfance ?", "Quel est le nom de ton école primaire ?", "Quel est ton plat préféré ?"];
  selectedQuestion: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService
  ) { }  

  @Output() form= new EventEmitter<any>(); 

  securityQuestionForm = this.formBuilder.group({ 
    email: ['', [Validators.required, Validators.email]],
    security: ['', Validators.required],
    
  }) 

  showMissing(controlName: string): any {
    const control = this.securityQuestionForm.get(controlName);
    return control?.hasError("required") && (control?.dirty || control?.touched);
  }  
  
  getRandomQuestion(): string {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions[randomIndex];
  } 

  ngOnInit(): void {
    this.selectedQuestion = this.getRandomQuestion();
    this.securityQuestionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      security: ['', Validators.required],
      
    });  
  }  

  onCreate() {
    if (this.securityQuestionForm.valid) {
        const newUserPassword: UserNewPassword = {
          email: this.securityQuestionForm.get('email')?.value,
          no_question: this.questions.indexOf(this.selectedQuestion) + 1,
          reponse: this.securityQuestionForm.get('security')?.value
        };  
        if(this.securityQuestionForm.value.email != null){
          this.userDataService.saveEmail(this.securityQuestionForm.value.email);
        }
        this.form.emit(newUserPassword);
        console.log("Form created");
      
    } else {
      this.securityQuestionForm.markAllAsTouched();
      console.log("Form erroné");
    }
  }  

}
