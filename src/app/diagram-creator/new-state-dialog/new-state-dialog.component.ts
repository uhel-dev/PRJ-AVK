import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, Validator, ValidatorFn, Validators} from '@angular/forms';

export interface NewStateDialogData {

  stateName: string;
  isInitialState: boolean;
  isAcceptableState: boolean;
  states: Array<any>;
}

@Component({
  selector: 'app-new-state-dialog',
  templateUrl: './new-state-dialog.component.html',
  styleUrls: ['./new-state-dialog.component.scss']
})
export class NewStateDialogComponent implements OnInit {

  stateNameFormControl: FormControl;
  isInitialFormControl: FormControl;
  isAcceptableFormControl: FormControl;

  matcher: MyErrorStateMatcher;
  disableButton: boolean = false
  isStateAlreadyInStates: boolean = false







  constructor(
    public dialogRef: MatDialogRef<NewStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewStateDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  validateDialog(): void {
    this.matcher = new MyErrorStateMatcher();
    this.stateNameFormControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      NoDuplicateStateCustomValidator.validate(this.data)]
    );
    this.isInitialFormControl = new FormControl('', [])
    this.isAcceptableFormControl = new FormControl('', [])

  }

  ngOnInit(): void {
    this.closingDialog()
    this.validateDialog()

  }

  onNewState() {
    if (this.stateNameFormControl.value) {
      const output = { name: this.stateNameFormControl.value, isAcceptableState:this.isAcceptableFormControl.value === true, isInitialState: this.isInitialFormControl.value === true}
      this.dialogRef.close(output)
    } else {
      this.dialogRef.close(null)
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  constructor() {}
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class NoDuplicateStateCustomValidator {
  static validate(data): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null =>
    {
      const numberOfAlreadyExistingElements = data.states.filter(state => state.name === control.value).length
      if (control.value !== undefined && (isNaN(control.value) && numberOfAlreadyExistingElements !== 0)) {
        return {'duplicateState': true};
      } else {
        return null;
      }
    }
  }
}
