import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NoDuplicateStateCustomValidator} from '../new-state-dialog/new-state-dialog.component';

export interface RenameStateDialogData {
  states: Array<any>;
  stateName: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-rename-state-dialog',
  templateUrl: './rename-state-dialog.component.html',
  styleUrls: ['./rename-state-dialog.component.scss']
})
export class RenameStateDialogComponent implements OnInit {

  renameStateNameFormControl: FormControl
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<RenameStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RenameStateDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  renameState() {
    this.dialogRef.close(this.renameStateNameFormControl.value)
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

  validateDialog() {
    this.matcher = new MyErrorStateMatcher();
    this.renameStateNameFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      NoDuplicateStateCustomValidator.validate(this.data)]
    );
  }

  ngOnInit() {
    this.closingDialog()
    this.validateDialog()
  }
}
