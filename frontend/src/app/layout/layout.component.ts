import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../user/authentification.service';
import { UserProfilComponent } from '../user/profil/user-profil/user-profil.component';
import { AdminService } from '../user/admin/admin.service';
import { LanguageService } from '../activity/language.service';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../activity/model/activity';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterOutlet, CommonModule, RouterModule, UserProfilComponent, ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
    title = 'GymGenius';
    isAuthenticated: boolean = false;
    username: string | null = null;
    isAdmin: boolean = false;
    activities: Activity[] = []; // Variable pour stocker les activités
    seenActivities: Activity[] = [];
    notificationBadge: number = 0;
    

    constructor(private authService: AuthenticationService, private adminService: AdminService, private languageService: LanguageService,private activityService: ActivityService) {}

    ngOnInit(): void {
        this.authService.getUsername().subscribe((username) => {
            this.isAuthenticated = !!username;
            this.username = username; 
            this.isAdmin = this.adminService.isAdmin();

            if (this.isAdmin && this.isAuthenticated) {
                this.authService.logoutUser();
            }
        });

        this.activityService.getActivities().subscribe((activities) => {
        this.activities = activities; // Mettez à jour la variable activities avec les activités récupérées
        this.updateSeenActivities();
        });
    }

        updateSeenActivities() {
        const storedSeenActivities = localStorage.getItem('seenActivities');
        this.seenActivities = storedSeenActivities ? JSON.parse(storedSeenActivities) : [];
        this.notificationBadge = this.activities.length - this.seenActivities.length;
    }

    logout(): void {
        if (this.isAdmin) {
            this.adminService.logoutAdmin();

            

        }

        this.authService.logoutUser();
    }

    switchLanguage(event: Event) {
        const selectedLanguage = (event.target as HTMLSelectElement).value;
        this.languageService.setLanguage(selectedLanguage);
    }

    capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
    }

    resetBadge() {
    this.seenActivities = this.activities.slice(); // Copie les activités dans seenActivities
    localStorage.setItem('seenActivities', JSON.stringify(this.seenActivities));
    this.notificationBadge = this.notificationBadge - this.notificationBadge;
    
}


}
