import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegistrationFormComponent], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should require first name field', () => {
    const firstName = component.registrationForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    let errors: any = {};
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should emit form data when submitted', () => {
    spyOn(component.form, 'emit');
    const dateOfBirth = '1990-01-01';
    component.registrationForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      dateOfBirth: dateOfBirth,
      password: 'password'
    });
    component.onCreate();
    expect(component.form.emit).toHaveBeenCalled();
  });

  it('should invalidate if user is underage', () => {
    const dateOfBirth = component.registrationForm.controls['dateOfBirth'];
    dateOfBirth.setValue('2010-01-01'); // Set date of birth to a date where the user is underage
  
    // Trigger the validation manually
    const validationErrors = component.validateDateOfBirth(dateOfBirth);
  
    expect(validationErrors).toEqual({ underage: true }); // Expects the validation to fail due to underage
  });
  
});
