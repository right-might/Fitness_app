import { Component, OnInit } from '@angular/core';
import { ModificationDataService } from '../confirmation-modification-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-modification-page',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modification-page.component.html',
  styleUrl: './confirmation-modification-page.component.css'
})
export class ConfirmationModificationPageComponent implements OnInit {
  userData: any;

  constructor(private modificationDataService: ModificationDataService, private router: Router) { }

  redirigerVersAutrePage() {
    this.router.navigate(['user/profile']); 
  }

  ngOnInit(): void {
    this.userData = this.modificationDataService.getUserData();
    // console.log('Données utilisateur récupérées :', this.userData);
  }
}
