import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentification.service';
import { UserCredentials } from './login/model/loginRequest';
import { environment } from '../../environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', fakeAsync(() => {
    const mockUserCredentials: UserCredentials = { username: 'testuser', password: 'testpassword' };
    const mockResponse: string | null = null;
  
    let username: string | null = null;
    service.loginUser(mockUserCredentials).then(() => {
      service.getUsername().subscribe(response => {
        username = response;
      });
    });

    const req = httpTestingController.expectOne(`${environment.backendUrl}/api/users/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

    tick();

    expect(username).toEqual(mockResponse);
  }));

  it('should logout user', fakeAsync(() => {
    let username: string | null = 'testuser';

    service.logoutUser().then(() => {
      service.getUsername().subscribe(response => {
        username = response;
      });
    });

    const req = httpTestingController.expectOne(`${environment.backendUrl}/api/users/logout`);
    expect(req.request.method).toEqual('POST');
    req.flush({});

    tick();

    expect(username).toBeNull();
  }));

});
