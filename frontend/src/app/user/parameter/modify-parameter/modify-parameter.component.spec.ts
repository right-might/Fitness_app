/*
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModifyParameterComponent } from "../modify-parameter/modify-parameter.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "../../authentification.service";
import { UserServiceService } from "../../profil/service/user-service.service";
import { of } from "rxjs";

describe("ModifyParameterComponent", () => {
  let component: ModifyParameterComponent;
  let fixture: ComponentFixture<ModifyParameterComponent>;
  let userServiceSpy: jasmine.SpyObj<UserServiceService>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const userServiceSpyObj = jasmine.createSpyObj("UserServiceService", [
      "getUserByUsername",
      "updateUser",
    ]);
    const authServiceSpyObj = jasmine.createSpyObj("AuthenticationService", [
      "getUsername",
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ModifyParameterComponent],
      providers: [
        { provide: UserServiceService, useValue: userServiceSpyObj },
        { provide: AuthenticationService, useValue: authServiceSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyParameterComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(
      UserServiceService
    ) as jasmine.SpyObj<UserServiceService>;
    authServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;

    authServiceSpy.getUsername.and.returnValue(of("testusername"));
    userServiceSpy.getUserByUsername.and.returnValue(
      of({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        username: "testusername",
        email: "john.doe@example.com",
        password: "password",
        role: "user",
        bio: "Some bio information",
        profilePicture: "url/to/profile/picture.jpg",
        trainerUsername: "entraineur",
      })
    );

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch user profile on initialization", () => {
    // Initialiser les valeurs à null ou undefined
    component.userProfile = null;
    component.username = null;
    component.userId = null;

    // Simuler le retour de service avec les données de l'utilisateur
    const userData = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "testusername",
      email: "john.doe@example.com",
      password: "password",
      role: "user",
      bio: "Some bio information",
      profilePicture: "url/to/profile/picture.jpg",
      trainerUsername: "entraineur",
    };
    userServiceSpy.getUserByUsername.and.returnValue(of(userData));

    // Appeler ngOnInit pour récupérer les données de l'utilisateur
    component.ngOnInit();

    // Assertions
    if (component.username !== null) {
      expect(component.username).toEqual("testusername");
    }

    expect(userServiceSpy.getUserByUsername).toHaveBeenCalledWith(
      "testusername"
    );

    if (component.userProfile !== null) {
      expect(component.userProfile).toEqual(userData);
    }
  });

  it("should update user profile", () => {
    component.userProfile = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "testusername",
      email: "john.doe@example.com",
      password: "password",
      role: "user",
      bio: "Some bio information",
      profilePicture: "url/to/profile/picture.jpg",
      trainerUsername: "entraineur",
    };

    component.modifyForm.setValue({
      firstName: "Updated",
      lastName: "User",
      username: "updatedusername",
      email: "updated.user@example.com",
    });

    userServiceSpy.updateUser.and.returnValue(of(null));

    component.onSave();

    expect(userServiceSpy.updateUser).toHaveBeenCalledWith({
      id: 1,
      firstName: "Updated",
      lastName: "User",
      username: "updatedusername",
      email: "updated.user@example.com",
      password: "password",
      role: "user",
      bio: "Some bio information",
      profilePicture: "url/to/profile/picture.jpg",
      trainerUsername: "entraineur",
    });
    expect(component.changesMade).toBeFalsy();
    expect(component.saving).toBeFalsy();
  });
});
*/
