import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireFormComponent } from './formulaire-form.component';

describe('FormulaireFormComponent', () => {
  let component: FormulaireFormComponent;
  let fixture: ComponentFixture<FormulaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
