import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogsManagerService} from './dialogs-manager.service';
import {StateTransition} from './mixins/state';
import {JsPlumbManagerService} from './js-plumb-manager.service';


@Component({
  selector: 'app-diagram-creator',
  templateUrl: './diagram-creator.component.html',
  styleUrls: ['./diagram-creator.component.scss']
})
export class DiagramCreatorComponent implements OnInit, AfterViewInit, AfterViewChecked {

  transitions: Array<StateTransition> = [];
  states: Array<any> = [];
  jsPlumbInstance;
  canvas;
  currentStateLength: number = this.states.length
  showLabelsMenu: boolean;
  bendness;

  constructor(private dialogsManagerService: DialogsManagerService, public dialog: MatDialog, private jsPlumbManagerService: JsPlumbManagerService) {
  }


  ngOnInit() {
    this.jsPlumbManagerService.setUpJsPlumbInstance()
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('diagram-boundary-id')
    this.jsPlumbManagerService.bindCustomConnectionEvent(this.states, this.transitions)
    this.jsPlumbManagerService.bindCustomConnectionDetachedEvent(this.transitions)
  }

  ngAfterViewChecked(): void {

    if(this.currentStateLength !== this.states.length) {
      const state = this.states[this.currentStateLength]
      const stateEl = document.getElementById(state.name)
      this.jsPlumbManagerService.makeElementASource(state.name, stateEl, this.canvas)
      this.jsPlumbManagerService.makeElementATarget(state.name)
      this.currentStateLength = this.states.length
    }

  }

  formatLabel(value: number) {
    this.bendness = value
    return value;
  }

  openNewStateDialog(event): void {
      let x = event.offsetX
      let y = event.offsetY
      if(event.shiftKey) {
        this.states.push({name: "P" + this.states.length, isAcceptable: false, isInitial: false, top: y, left: x})
      }
      else {
        const isCreated = this.dialogsManagerService.openNewStateDialog(x, y, this.states)
      }
  }

  openRenameStateDialog(stateName): void {
    this.dialogsManagerService.openRenameStateDialog(stateName, this.states)
  }


  toggleAcceptableState(stateName) {
    let state = this.states.filter(state => state.name === stateName)[0]
    state.isAcceptable = !state.isAcceptable
  }

  toggleInitialState(stateName) {
    const state = this.states.filter(s => s.name === stateName)[0];
    const currentInitialState = this.states.filter(s => s.isInitial && s.name !== stateName)
    currentInitialState.forEach(state => state.isInitial = false)
    state.isInitial = !state.isInitial
  }

  removeClickedState(stateName): void {
    this.states = this.states.filter(state => state.name !== stateName)
  }

  restartCanvas() {
    this.jsPlumbManagerService.restartCanvas()
    this.transitions = []
  }
}

