import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationPageComponent } from '../registration-page/registration-page.component';
import { AuthenticationService } from '../../../authentification.service';
import { UserNewAccount } from '../../model/user-registration';
import { Router } from '@angular/router';
import { RegistrationFormComponent } from '../../registraition-form/registration-form/registration-form.component';


describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthenticationService', ['createNewUser']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, RegistrationPageComponent, RegistrationFormComponent],
      providers: [
        { provide: AuthenticationService, useValue: authService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user successfully', async () => {
    const newUser: UserNewAccount = {
      id:111,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      dateOfBirth: new Date('1990-01-01'),
      password: 'password'
    };

    authService.createNewUser.and.returnValue(Promise.resolve());
    spyOn(router, 'navigate');

    await component.registerUser(newUser);

    expect(authService.createNewUser).toHaveBeenCalledWith(newUser);
    expect(router.navigate).toHaveBeenCalledWith(['user/register/security_questions']);
    expect(component.createUserErrorMessage).toBeNull();
  });

  it('should handle registration error', async () => {
    const newUser: UserNewAccount = {
      id:111,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      dateOfBirth: new Date('1990-01-01'),
      password: 'password'
    };
  
    authService.createNewUser.and.throwError('Server error');
  
    await component.registerUser(newUser);
  
    expect(authService.createNewUser).toHaveBeenCalledWith(newUser);
    expect(component.createUserErrorMessage).toBe("Erreur au niveau serveur, veuillez vérifier le nom ou l'email.");
  });
  
});
