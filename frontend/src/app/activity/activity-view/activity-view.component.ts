import { Component, Inject, Input } from '@angular/core'
import { Activity } from '../model/activity'
import { CommonModule, DatePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ActivityMapComponent } from '../activity-map/activity-map.component'

@Component({
    selector: 'app-activity-confirm',
    standalone: true,
    imports: [DatePipe, CommonModule, ActivityMapComponent],
    templateUrl: './activity-view.component.html',
    styleUrl: './activity-view.component.scss',
})
export class ActivityConfirmComponent {
    activity!: Activity
    action!: string

    @Input()
    activityString!: string
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { activityString: string },
        public dialogRef: MatDialogRef<ActivityConfirmComponent>
    ) {
        if (data && data.activityString) {
            this.activityString = data.activityString
            this.activity = JSON.parse(this.activityString)
        }
    }

    closeDialog(): void {
        this.dialogRef.close()
    }

    capitalizeFirstLetter(word: String): String {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}
