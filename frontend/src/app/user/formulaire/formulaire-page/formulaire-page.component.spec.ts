import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormulairePageComponent } from './formulaire-page.component';
import { AuthenticationService } from '../../authentification.service';
import { UserServiceService } from '../../profil/service/user-service.service';
import { of } from 'rxjs';
import { UserNewMessage } from '../model/user-message';
import { UserProfile } from '../../profil/model/user-profile';

describe('FormulairePageComponent', () => {
  let component: FormulairePageComponent;
  let fixture: ComponentFixture<FormulairePageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let userServiceSpy: jasmine.SpyObj<UserServiceService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getUsername', 'createMessage']);
    userServiceSpy = jasmine.createSpyObj('UserServiceService', ['getUserByUsername']);

    await TestBed.configureTestingModule({
    imports: [FormulairePageComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UserServiceService, useValue: userServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulairePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on initialization', () => {
    const username = 'testuser';
    const userProfile: UserProfile = { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      password: 'password',
      username: username,
      email: 'john@example.com',
      role: 'user',
      bio: 'Lorem ipsum dolor sit amet',
      profilePicture: 'path/to/picture',
      trainerUsername: ''
    };
    authServiceSpy.getUsername.and.returnValue(of(username));
    userServiceSpy.getUserByUsername.and.returnValue(of(userProfile));

    component.ngOnInit();

    expect(authServiceSpy.getUsername).toHaveBeenCalled();
    expect(userServiceSpy.getUserByUsername).toHaveBeenCalledWith(username);
    expect(component.userProfile).toEqual(userProfile);
  });


});
