import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { UserProfile } from '../model/user-profile';
import { AuthenticationService } from '../../authentification.service';
import { Router } from '@angular/router'; // Importez le Router de Angular
import { CommonModule } from '@angular/common';
import { Trainer } from '../../admin/model/model';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class TrainerListComponent implements OnInit {
  trainers: Trainer[] | null = null;
  username: string | null = null;
  userId: number| null = null;


  constructor(
    private userService: UserServiceService,
    private authService: AuthenticationService,
    private router: Router 
    // Injectez le Router dans le constructeur
  ) { }

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.username = username;

      if (this.username) {
        this.getAllTrainers();
        this.authService.getId().subscribe(userId=>{
          this.userId=userId;
        });

      }
    
    });
  }

  getAllTrainers(): void {
    if (this.username) {
      this.userService.getAllTrainers()
        .subscribe(trainers => this.trainers = trainers);
    }
  }

  onJoinTrainer(trainerId: number): void {
    if (this.userId && trainerId) {
      this.userService.joinTrainer(this.userId, trainerId).subscribe(
          response => {
            console.log('Joined trainer successfully:', response);
            this.router.navigate(['/user/profile']);
          },
          error => {
            console.error('Failed to join trainer:', error);
            this.router.navigate(['/user/profile']);

          }
        );
    }
  }
}
