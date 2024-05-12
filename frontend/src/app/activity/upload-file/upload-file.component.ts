import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { ActivityService } from '../activity.service'
import { AuthenticationService } from '../../user/authentification.service'
import { UserServiceService } from '../../user/profil/service/user-service.service'
import { Activity } from '../model/activity'
import { ExcelService } from '../excel.service'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-upload-file',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
    @ViewChild('fileToUpld')
    private _fileUploadField!: ElementRef

    userId!: number
    showError: boolean = false
    errorMsgFormatExcel: string = ''
    errorMessage: string | null = null
    downloadedFiles: string[] = []
    username$ = this.authenticationService.getUsername()
    username: string | null = null
    usernameSubscription!: Subscription

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {},
        public dialogRef: MatDialogRef<UploadFileComponent>,
        private excelService: ExcelService,
        private activityService: ActivityService,
        private authenticationService: AuthenticationService,
        private userService: UserServiceService,
        private dialog: MatDialog
    ) {
        this.usernameSubscription = this.username$.subscribe((user) => {
            this.username = user
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
    }

    async uploadFile() {
        const file = this._fileUploadField.nativeElement.files[0]
        const fileName = file.name

        // Vérification du type de fichier
        if (
            !file.type.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') &&
            !file.type.includes('application/vnd.ms-excel')
        ) {
            this.showError = true
            this.errorMsgFormatExcel = "Le format du fichier ajouté n'est pas respecté."
            return
        }

        this.excelService
            .readExcelFile(file)
            .then(async (data: any[]) => {
                const jsonParsedData = JSON.parse(JSON.stringify(data))

                const activities: Activity[] = jsonParsedData.map((item: any) => {
                    const durationMin = item[2023] !== undefined ? parseFloat(item.__EMPTY) : 0
                    const comment = item.__EMPTY_3 !== undefined ? item.__EMPTY_3 : ''

                    return {
                        id_activity: undefined,
                        id_user: this.userId,
                        type_activity: item.vélo,
                        date: new Date(item.Année),
                        distance_km: item[2023],
                        duration_min: durationMin,
                        pace: item.pace !== undefined ? item.pace : '',
                        heart_beat_min: item.__EMPTY_2 !== undefined ? item.__EMPTY_2 : '',
                        temperature_c: item.course !== undefined ? item.course : '',
                        description_activity: item.marche,
                        comment: comment,
                    }
                })

                // Post all activities
                for (let i = 0; i < activities.length; i++) {
                    const newActivity = activities[i]
                    await this.activityService
                        .postActivity(newActivity)
                        .then(() => {
                            setTimeout(() => {}, 5000)
                        })
                        .catch((error) => {
                            console.error('Error posting activity:', error)
                        })
                }
                this.dialogRef.close()
            })
            .catch((error) => {
                this.errorMessage = 'Une erreur est survenue lors de la lecture du fichier.'
            })
    }

    closeDialog() {
        this.dialogRef.close()
    }
}
