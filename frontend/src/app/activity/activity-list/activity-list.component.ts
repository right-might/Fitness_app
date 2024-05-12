import { Component, ElementRef, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

import { Activity } from '../model/activity'
import { ActivityService } from '../activity.service'
import { ActivityFormComponent } from '../activity-form/activity-form.component'
import { ActivityTableComponent } from '../activity-table/activity-table.component'
import { ActivitySearchComponent } from '../activity-search/activity-search.component'
import { DialogComponent } from '../dialog-delete/dialog-delete.component'
import { SelectMultipleComponent } from '../dialog-delete-multiple/dialog-delete-multiple.component'
import { Router } from '@angular/router'
import { SuccessDialogComponent } from '../dialog-success/dialog-success.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatFormFieldModule } from '@angular/material/form-field'
import { UploadFileComponent } from '../upload-file/upload-file.component'
import { TranslateModule } from '@ngx-translate/core'
import { DateFilterComponent } from '../date-filter/date-filter.component'

@Component({
    selector: 'app-activity-list',
    standalone: true,
    imports: [
        ActivityTableComponent,
        ActivityFormComponent,
        DateFilterComponent,
        DialogComponent,
        CommonModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        ActivitySearchComponent,
        SelectMultipleComponent,
        MatSnackBarModule,
        MatMenuModule,
        MatFormFieldModule,
        TranslateModule,
    ],
    providers: [ActivityTableComponent],
    templateUrl: './activity-list.component.html',
    styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent {
    activityId!: number
    successMessage: string | null = null
    datePickerOpened = false
    filterValue: string = ''

    @ViewChild(ActivityTableComponent)
    activityTable!: ActivityTableComponent

    @ViewChild(ActivitySearchComponent)
    activitySearchComponent!: ActivitySearchComponent

    constructor(
        private activityService: ActivityService,
        private router: Router,
        private dialog: MatDialog,
        private activityTableCompent: ActivityTableComponent,
        private _snackBar: MatSnackBar
    ) {}

    // Méthode pour créer une nouvelle activité
    createNewActivity() {
        this.router.navigate(['/activity'])
    }

    // Méthode pour transferer une activité vers le formulaire de modification
    // ou vers la boite de dialogue de suppression
    async sendActivity(activityData: any) {
        if (typeof activityData === 'object' && 'indent' in activityData) {
            const intent = activityData.indent
            this.activityId = activityData.id_activity

            try {
                let existingActivity = await this.activityService.getActivityById(this.activityId)

                if (intent === 'edit') {
                    this.router.navigate(['/activity'], { queryParams: { form: JSON.stringify(existingActivity) } })
                } else if (intent === 'remove') {
                    this.openDialog(existingActivity)
                } else {
                    console.error('Unknown intent:', intent)
                }
            } catch (error) {
                console.error('Error fetching existing activity:', error)
            }
        } else {
            console.error('Invalid activityData format:', activityData)
        }
    }

    // Méthode pour ouvrir une boîte de dialogue de confirmation de suppression
    async openDialog(activity: Activity) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { existingActivity: activity },
        })
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirm') {
                this.deleteActivity(activity.id_activity)
                this.openDialogSuccess()
            }
        })
    }

    // Méthode pour supprimer une activité
    async deleteActivity(index: number) {
        await this.activityService
            .removeActivity(index)
            .then(() => {
                this.successMessage = 'Activité supprimée avec succès'
                setTimeout(() => {
                    this.successMessage = null
                }, 5000)
            })
            .catch((error) => {
                console.error('Error deleting activity:', error)
            })
    }

    // Méthode pour ouvrir une boîte de dialogue de succès de suppression
    async openDialogSuccess() {
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: null,
        })
        dialogRef.afterClosed().subscribe(() => {
            this.activityTableCompent.loadActivities('')
        })
    }

    // Méthode pour gérer la soumission du formulaire de recherche
    async handleSearchSubmit(filterValue: string) {
        this.filterValue = filterValue
        this.activityTableCompent.loadActivities(filterValue)
    }

    // Méthode pour basculer l'état du filtre de date
    toggleDatePicker(): boolean {
        return (this.datePickerOpened = !this.datePickerOpened)
    }

    // Méthode appelée lorsque la sélection de date est modifiée
    dateSelectionChanged(date: { start: string; end: string }) {
        this.activityService.clear()
        this.activityTableCompent.loadActivitiesFromService()
        this.activityService.filterActivitiesByDate(date.start, date.end)
    }

    async onDeleted(): Promise<void> {
        const data = this.activityTable.getDataToRetrieve()
        try {
            for (let i = 0; i < data.length; i++) {
                await this.deleteActivity(data[i])
            }
            this.activityTable.clearSelection()
        } catch (error) {
            console.error('Error deleting activities:', error)
        }
    }

    // Méthode pour ouvrir une boîte de dialogue de sélection multiple
    openSelectedDialog() {
        if (!this.activityTable.selection.hasValue()) {
            this.openSnackBar("Aucune activité n'est sélectionnée.", '')
            return
        }

        const dialogRef = this.dialog.open(SelectMultipleComponent, {
            data: null,
        })

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.onDeleted().then(() => {
                    this.activityTableCompent.loadActivitiesFromService()
                    this.openDialogSuccess()
                })
            }
        })
    }

    // Méthode pour supprimer plusieurs lignes
    async onDeletedMultipleRow() {
        const data = this.activityTable.getDataToRetrieve()
        try {
            for (let i = 0; i < data.length; i++) {
                await this.deleteActivity(data[i])
            }
            this.activityTable.clearSelection()
        } catch (error) {
            console.error('Error deleting activities:', error)
        }
    }

    async showAll() {
        this.activitySearchComponent.clearText()

        this.filterValue = ''
        this.activityTable.loadActivities(this.filterValue)
    }

    openFileSelector() {
        const dialogRef = this.dialog.open(UploadFileComponent, {
            data: null,
        })
        dialogRef.afterClosed().subscribe(() => {
            this.activityTableCompent.loadActivities('')
        })
    }

    // Méthode pour ouvrir un snackbar
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        })
    }

    closeDropdown(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const isCancelButton = target.classList.contains('btn-danger');
        const isApplyButton = target.classList.contains('btn-success');
    
        if (!isCancelButton && !isApplyButton) {
            event.stopPropagation();
        }
    }    

}
