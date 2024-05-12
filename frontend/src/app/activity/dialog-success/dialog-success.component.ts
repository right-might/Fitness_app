import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Activity } from '../model/activity'

@Component({
    selector: 'app-success-dialog',
    standalone: true,
    imports: [],
    templateUrl: './dialog-success.component.html',
    styleUrl: './dialog-success.component.scss',
})
export class SuccessDialogComponent {
    existingActivity!: Activity

    constructor(@Inject(MAT_DIALOG_DATA) public data: {}, public dialogRef: MatDialogRef<SuccessDialogComponent>) {}

    closeDialog(): void {
        this.dialogRef.close('deleted')
    }
}
