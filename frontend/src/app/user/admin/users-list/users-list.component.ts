import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; 
import { CommonModule } from '@angular/common';
import { PublicProfilComponent } from '../../public-profil/public-profil/public-profil.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  imports:[CommonModule,PublicProfilComponent],
  standalone:true,
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersAndClients: any[] = []; 
  showProfile: boolean = false;
  selectedUsername: string | null = null;
  


  constructor(private adminService: AdminService,
  private router:Router) { }

  ngOnInit(): void {
    this.loadUsersAndClients();
  }

  loadUsersAndClients() {
    this.adminService.getAllUsersAndClients().subscribe(
      (data) => {
        this.usersAndClients = data;
        console.log('Utilisateurs et clients récupérés :', this.usersAndClients);
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des utilisateurs et clients :', error);
      }
    );
  }
  

  onViewProfile(username: string) {
    this.router.navigate([ username]);

  }
}
