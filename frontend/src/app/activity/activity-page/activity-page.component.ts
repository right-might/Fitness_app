import { Component, OnInit } from '@angular/core'
import { ActivityFormComponent } from '../activity-form/activity-form.component'
import { CommonModule } from '@angular/common'
import { Activity } from '../model/activity'
import { ActivityService } from '../activity.service'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../user/authentification.service'
import { Subscription } from 'rxjs'
import { UserServiceService } from '../../user/profil/service/user-service.service'
import { MatDialog } from '@angular/material/dialog'
import { SuccessDialogComponent } from '../dialog-success/dialog-success.component'

@Component({
    selector: 'app-activity-page',
    standalone: true,
    imports: [ActivityFormComponent, CommonModule],
    templateUrl: './activity-page.component.html',
    styleUrl: './activity-page.component.scss',
})
export class ActivityPageComponent implements OnInit {
    successMessage: string | null = null
    index!: number
    activities: Activity[] = []

    username$ = this.authenticationService.getUsername()

    username: string | null = null
    usernameSubscription!: Subscription
    userId!: number

  receivedActivity = new FormGroup({
    id_activity: new FormControl(),
    type_activity: new FormControl(),
    date: new FormControl(),
    distance_km: new FormControl(),
    duration_min: new FormControl(),
    pace: new FormControl(),
    heart_beat_min: new FormControl(),
    gpx_file: new FormControl(),
    temperature_c: new FormControl(),
    description_activity: new FormControl(),
    comment: new FormControl()
  });

    constructor(
        private authenticationService: AuthenticationService,
        private activityService: ActivityService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserServiceService,
        private dialog: MatDialog
    ) {
        this.usernameSubscription = this.username$.subscribe((u) => {
            this.username = u
        })
    }

    ngOnInit(): void {
        if (this.username) {
            this.userService.getUserByUsername(this.username).subscribe(
                (userProfile) => {
                    this.userId = userProfile.id
                },
                (error) => {
                    console.error('Failed to get user profile:', error)
                }
            )
        }
        this.receiveActivity()
    }

    ngOnDestroy(): void {
        if (this.usernameSubscription) {
            this.usernameSubscription.unsubscribe()
        }
    }

  async handleFormSubmit(formActivity: {
    id_activity: number;
    type_activity: string;
    date: Date;
    distance_km: number;
    duration_min: number;
    pace: number;
    heart_beat_min: number;
    temperature_c: number;
    gpx_file: string;
    description_activity: string;
    comment: string;
    }) {
      if (this.username != null) {
        const newActivity = {
          id_activity: formActivity.id_activity,
          id_user: this.userId,
          type_activity: formActivity.type_activity,
          date: formActivity.date,
          distance_km: formActivity.distance_km,
          duration_min: formActivity.duration_min,
          pace: formActivity.pace,
          heart_beat_min: formActivity.heart_beat_min,
          temperature_c: formActivity.temperature_c,
          gpx_file: formActivity.gpx_file,
          description_activity: formActivity.description_activity,
          comment: formActivity.comment
        } as Activity;
        
        if (this.index !== undefined && this.index !== 0) {
            await this.editActivity(newActivity);
        } else {
          this.addActivity(newActivity);
        }
    }
  }; 

    async addActivity(newActivity: Activity) {
        await this.activityService
            .postActivity(newActivity)
            .then(() => {
                this.successMessage = 'Activité ajoutée avec succès'
                setTimeout(() => {
                    this.successMessage = null
                }, 5000)
                this.router.navigate(['/activities'])
                this.openDialogSuccess()
            })
            .catch((error) => {
                console.error('Error posting activity:', error)
            })
    }

    async editActivity(newActivity: Activity) {
        await this.activityService
            .updateActivity(newActivity)
            .then(() => {
                this.successMessage = 'Activité mise à jour avec succès'
                setTimeout(() => {
                    this.successMessage = null
                }, 5000)
                this.router.navigate(['/activities'])
                this.openDialogSuccess()
            })
            .catch((error) => {
                console.error('Error updating activity:', error)
            })
    }

    receiveActivity() {
        this.route.queryParams.subscribe((params) => {
            if (params['form']) {
                const activityData = JSON.parse(params['form'])

                const activityFormGroup = this.fb.group({
                    id_activity: [activityData.id_activity],
                    type_activity: [activityData.type_activity],
                    date: [activityData.date],
                    distance_km: [activityData.distance_km],
                    duration_min: [activityData.duration_min],
                    pace: [activityData.pace],
                    heart_beat_min: [activityData.heart_beat_min],
                    temperature_c: [activityData.temperature_c],
                    gpx_file: [activityData.gpx_file],
                    description_activity: [activityData.description_activity],
                    comment: [activityData.comment],
                })

                this.index = activityData.id_activity

                if (activityFormGroup instanceof FormGroup) {
                    this.receivedActivity.patchValue(activityFormGroup.value)
                }
            }
        })
    }

    // Méthode pour ouvrir une boîte de dialogue de succès de suppression
    async openDialogSuccess() {
        this.dialog.open(SuccessDialogComponent, {
            data: null,
        })
    }
}
