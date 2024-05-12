import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';


@Component({
  selector: 'app-formulaire-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgIf],
  templateUrl: './formulaire-form.component.html',
  styleUrl: './formulaire-form.component.css'
}) 


export class FormulaireFormComponent implements OnInit{
  showMissing(controlName: string): any {
    const control = this.formulaireForm.get(controlName);
    return control?.hasError("required") && (control?.dirty || control?.touched);
  } 

  @Output() form= new EventEmitter<any>();
  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {}  

  formulaireForm = this.formBuilder.group({
    sujet : ['', Validators.required],
    contenu : ['', Validators.required],
  })
  
  onCreate() {
    if (this.formulaireForm.valid) {
      this.form.emit(this.formulaireForm.value);
      console.log("Form created")
    } else {
      this.formulaireForm.markAllAsTouched();
      console.log("Form errone")

    }
  

  }
}
