import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationDataService } from '../confirmation-data.service';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.css'
})

export class ConfirmationPageComponent implements OnInit {
  userData: any;

  constructor(private registrationDataService: RegistrationDataService, private router: Router) { }

  redirigerVersAutrePage() {
    this.router.navigate(['auth/login']); 
  }

  ngOnInit(): void {
    this.userData = this.registrationDataService.getUserData();
    // console.log('Données utilisateur récupérées :', this.userData);
  }
}
