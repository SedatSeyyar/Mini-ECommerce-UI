import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.scss']
})
export class InsertDialogComponent {

  constructor(public dialogRef: MatDialogRef<InsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: 1) { }

    close(): void {
      this.dialogRef.close();
    }
}