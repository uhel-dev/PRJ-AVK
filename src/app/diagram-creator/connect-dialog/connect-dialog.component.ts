import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NewStateDialogData} from '../new-state-dialog/new-state-dialog.component';

@Component({
  selector: 'app-connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.scss']
})
export class ConnectDialogComponent implements OnInit {
  transitionLabelFormControl: FormControl;
  transitionToFormControl: FormControl;

  constructor( public dialogRef: MatDialogRef<ConnectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: NewStateDialogData) { }

  ngOnInit() {
    // this.closingDialog()
    this.transitionLabelFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(10)]
    );

    this.transitionToFormControl = new FormControl('', [Validators.required])
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTransitionLabel() {
    const label = this.transitionLabelFormControl.value
    this.dialogRef.close(label)
  }

  closingDialog(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.onNoClick();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.onNoClick();
    });
  }

}
