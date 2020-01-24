import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewStateDialogComponent} from './new-state-dialog/new-state-dialog.component';


export interface DialogData {

  stateName: string;
  isInitialState: boolean;
  isAcceptableState: boolean;
  states: Array<any>;
}

@Component({
  selector: 'app-diagram-creator',
  templateUrl: './diagram-creator.component.html',
  styleUrls: ['./diagram-creator.component.scss']
})
export class DiagramCreatorComponent implements OnInit  {

  opened: boolean
  states: Array<any> = []

  constructor(public dialog: MatDialog) {}


  ngOnInit() {
  }

  createNewState(stateName, isAcceptable, isInitial) {
    if(this.states.length != 20) {
      this.states.push({name: stateName, isAcceptable: isAcceptable, isInitial: isInitial})

    }
  }

  openDialog(event): void {
    if(this.getElementIdByEvent(event) === null || this.states.length === 0) {


      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '280px';
      dialogConfig.data = {stateName: undefined, isInitialState: false, isAcceptableState: false, states: this.states}

      const dialogRef = this.dialog.open(NewStateDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        let stateName = result.name;
        let isAcceptable = result.isAcceptableState
        let isInitial = result.isInitialState
        let existingEntries = this.states.filter(s => s.name === stateName)
        if((stateName && stateName !== '') && existingEntries.length === 0) {
          this.createNewState(stateName, isAcceptable, isInitial)
        }

      });
    }
  }

  getElementIdByEvent(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    if(idAttr) return idAttr.nodeValue;
    else return null
  }
  toggleAcceptableState(event) {
    const value = this.getElementIdByEvent(event)
    const el: HTMLElement = document.getElementById(value);
    const state = this.states.filter(s => s.name === value)[0];

    state.isAcceptable = !state.isAcceptable;
    if(state.isAcceptable){
      el.classList.add('state-acceptable-state-add');
      el.classList.remove('state-acceptable-state-remove');
    }else {
      el.classList.add('state-acceptable-state-remove');
      el.classList.remove('state-acceptable-state-add');
    }
  }



  setInitialState(stateName) {
    const state = this.states.filter(s => s.name === stateName)[0];
    const currentInitialState = this.states.filter(s => s.isInitial)
    currentInitialState.forEach(state => state.isInitial = !state.isInitial)
    state.isInitial = !state.isInitial
  }
}

