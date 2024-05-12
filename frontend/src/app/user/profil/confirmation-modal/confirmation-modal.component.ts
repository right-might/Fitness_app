import { Component, EventEmitter, Output } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
  standalone:true,
})
export class ConfirmationModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>) {}

  @Output() confirm = new EventEmitter<void>();

  confirmAction() {
    this.confirm.emit(); 
  }


  onSave(): void {
    console.log('Save button clicked');
    this.dialogRef.close('saved'); 
  }

  onCancel(): void {
    console.log('Cancel button clicked');
    this.dialogRef.close('cancelled');
  }
}
