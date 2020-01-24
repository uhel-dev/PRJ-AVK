import {Component, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../diagram-creator.component';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-new-state-dialog',
  templateUrl: './new-state-dialog.component.html',
  styleUrls: ['./new-state-dialog.component.scss']
})



export class NewStateDialogComponent implements OnInit {

  states: Array<any> = []
  disableButton: boolean = false
  sameStateNameUsed: boolean = true

  constructor(
    public dialogRef: MatDialogRef<NewStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  checkValidStateName(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const value = target.value
    console.log(value)
    const numberOfAlreadyExistingElements = this.data.states.filter(state => state.name === value).length
    if(numberOfAlreadyExistingElements !== 0){
      this.disableButton = true
      this.sameStateNameUsed = false
    }
    else {
      this.disableButton = false
      this.sameStateNameUsed = true
    }
  }

  onNewState() {
    const output = { name: this.data.stateName, isAcceptableState: this.data.isAcceptableState, isInitialState: this.data.isInitialState}
    this.dialogRef.close(output)
  }
}

