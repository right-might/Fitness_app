import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ParameterPageComponent } from './parameter-page.component';
import { AuthenticationService } from '../../authentification.service';
import { UserServiceService } from '../../profil/service/user-service.service';
import { of } from 'rxjs';
import { UserProfile } from '../../profil/model/user-profile';

describe('ParameterPageComponent', () => {
  let component: ParameterPageComponent;
  let fixture: ComponentFixture<ParameterPageComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userService: jasmine.SpyObj<UserServiceService>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getUsername']);
    const userServiceSpy = jasmine.createSpyObj('UserServiceService', ['getUserByUsername']);

    TestBed.configureTestingModule({
      imports: [ ParameterPageComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UserServiceService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    userService = TestBed.inject(UserServiceService) as jasmine.SpyObj<UserServiceService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  
})
