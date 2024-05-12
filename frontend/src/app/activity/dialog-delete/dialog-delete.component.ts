import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Activity } from '../model/activity'

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [],
    templateUrl: './dialog-delete.component.html',
    styleUrl: './dialog-delete.component.scss',
})
export class DialogComponent {
    existingActivity!: Activity

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { existingActivity: Activity },
        public dialogRef: MatDialogRef<DialogComponent>
    ) {}

    onConfirm(): void {
        this.dialogRef.close('confirm')
    }

    closeDialog(): void {
        this.dialogRef.close()
    }
}
