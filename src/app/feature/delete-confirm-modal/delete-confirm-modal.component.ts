import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss'],
})
export class DeleteConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: string },
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>
  ) {}

  onCancel() {
    this.dialogRef.close();
  }
}
