import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { UserServiceService } from "./user-service.service";
import { UserProfile } from "../model/user-profile";
import { environment } from "../../../../environments/environment";

describe("UserServiceService", () => {
  let service: UserServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceService],
    });
    service = TestBed.inject(UserServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve user by username", () => {
    const mockUser: UserProfile = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      password: "password123",
      username: "johndoe",
      email: "john@example.com",
      role: "user",
      bio: "Lorem ipsum dolor sit amet",
      trainerUsername: "",
      profilePicture: "",
    };

    const username = "johndoe";
    service.getUserByUsername(username).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `${environment.backendUrl}/api/users/find/${username}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockUser);
  });
});
