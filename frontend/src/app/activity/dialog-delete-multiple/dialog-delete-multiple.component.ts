import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Activity } from '../model/activity'

@Component({
    selector: 'app-select-multiple',
    standalone: true,
    imports: [],
    templateUrl: './dialog-delete-multiple.component.html',
    styleUrl: './dialog-delete-multiple.component.scss',
})
export class SelectMultipleComponent {
    existingActivity!: Activity

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { existingActivity: Activity },
        public dialogRef: MatDialogRef<SelectMultipleComponent>
    ) {}

    onConfirm(): void {
        this.dialogRef.close('confirm')
    }

    closeDialog(): void {
        this.dialogRef.close()
    }
}
