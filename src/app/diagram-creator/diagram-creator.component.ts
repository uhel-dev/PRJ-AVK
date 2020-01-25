import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatMenuTrigger} from '@angular/material';
import {NewStateDialogComponent} from './new-state-dialog/new-state-dialog.component';
import {RenameStateDialogComponent} from './rename-state-dialog/rename-state-dialog.component';



export class State {
  name: string;
  isInitial: boolean;
  isAcceptable: boolean;
}

@Component({
  selector: 'app-diagram-creator',
  templateUrl: './diagram-creator.component.html',
  styleUrls: ['./diagram-creator.component.scss']
})
export class DiagramCreatorComponent implements OnInit, AfterViewInit {

  opened: boolean
  states: Array<any> = []


  constructor(public dialog: MatDialog, private elementRef: ElementRef) {
  }


  ngOnInit() {

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.code === 'ShiftLeft') {
      // this.states.forEach(state => this.positionTarget(state.name))
    }
  }

  ngAfterViewInit(): void {
  }

  createNewState(stateName, isAcceptable, isInitial, x, y) {
    if(this.states.length != 20) {
      this.states.push({name: stateName, isAcceptable: isAcceptable, isInitial: isInitial, x: x, y: y})

    }
  }

  openNewStateDialog(event): void {
    if(this.getElementIdByEvent(event) === null || this.states.length === 0) {
      console.log(event.target)
      if(event.target.id) {
        console.log(event.target.id)
      }
      let x = event.clientX;
      let y = event.clientY - 90;
      const dataIn = {states: this.states}
      const dialogConfig = DiagramCreatorComponent.getDialogGlobalConfigs(dataIn)
      const dialogRef = this.dialog.open(NewStateDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          const isDuplicate = this.states.filter(state => state.name === result.name).length > 0
          if(!isDuplicate) {
            let stateName = result.name;
            let isAcceptable = result.isAcceptableState
            let isInitial = result.isInitialState
            if(isInitial === true) {
              const currentInitialState = this.states.filter(s => s.isInitial)
              currentInitialState.forEach(state => state.isInitial = false)
            }
            this.createNewState(stateName, isAcceptable, isInitial,x , y)
          }
        }
      });
    }
  }

  openRenameStateDialog(stateName): void {
    const dataIn = {states: this.states, StateName: stateName}
    const dialogConfig = DiagramCreatorComponent.getDialogGlobalConfigs(dataIn)
    const dialogRef = this.dialog.open(RenameStateDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      let state = this.states.filter(state => state.name === stateName)[0]
      state.name = result
    })
  }

  getElementIdByEvent(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    if(idAttr) return idAttr.nodeValue;
    else return null
  }
  toggleAcceptableState(stateName) {
    let state = this.states.filter(state => state.name === stateName)[0]
    state.isAcceptable = !state.isAcceptable
  }



  setInitialState(stateName) {
    const state = this.states.filter(s => s.name === stateName)[0];
    const currentInitialState = this.states.filter(s => s.isInitial && s.name !== stateName)
    currentInitialState.forEach(state => state.isInitial = false)
    state.isInitial = !state.isInitial
  }

  removeClickedState(stateName): void {
    this.states = this.states.filter(state => state.name !== stateName)
  }

  static getDialogGlobalConfigs(dataIn: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '280px';
    dialogConfig.data = dataIn
    return dialogConfig
  }


}

