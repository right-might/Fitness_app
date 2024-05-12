import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentification.service';
import { UserProfile } from '../../profil/model/user-profile';
import { UserServiceService } from '../../profil/service/user-service.service';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-parameter-page',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './parameter-page.component.html',
  styleUrl: './parameter-page.component.css'
})



export class ParameterPageComponent implements OnInit {
  userProfile: UserProfile | null = null;
  username: string | null = null;
  userId: number | null = null;

  // constructor(
  //   private authService: AuthenticationService,
  //   private userService: UserServiceService, 
  // ) {}  
  constructor(
    private authService: AuthenticationService,
    private userService: UserServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.authService.isConnected()){
       this.onGetUser();
      }
    
  }

  onGetUser(): void {
    this.authService.getId().subscribe((id) => {
    this.userId=id;
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(
        (userProfile) => {
          this.userProfile = userProfile;
        },
        (error) => {
          console.error("Failed to get user profile:", error);
        }
      ); 
    }
  });
}

  hidePassword(password: string | null): string {
    return password ? '•'.repeat(password.length) : '';
  } 

  onUpdateUser(): void {
    
    this.router.navigate(["/user/profile/parameter/modify"]);
  }
}

