import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerListComponent } from './trainer-list.component';
import { UserServiceService } from '../service/user-service.service';
import { AuthenticationService } from '../../authentification.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainerListComponent', () => {
  let component: TrainerListComponent;
  let fixture: ComponentFixture<TrainerListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserServiceService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const userServiceSpyObj = jasmine.createSpyObj('UserServiceService', ['getAllTrainers', 'joinTrainer']);
    const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['getUsername']);
    authServiceSpyObj.getUsername.and.returnValue(of('testUsername'));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,TrainerListComponent],
      providers: [
        { provide: UserServiceService, useValue: userServiceSpyObj },
        { provide: AuthenticationService, useValue: authServiceSpyObj }
      ],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserServiceService) as jasmine.SpyObj<UserServiceService>;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
