import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DiagramCreatorComponent} from './diagram-creator/diagram-creator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewStateDialogComponent } from './diagram-creator/new-state-dialog/new-state-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramCreatorComponent,
    NewStateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [MaterialModule],
  bootstrap: [AppComponent],
  entryComponents: [NewStateDialogComponent]
})
export class AppModule {}
// const t1 = {'qEven', 'qOdd', 1}
// const t2 = {'qOdd', 'qEven', 0}
// {[qOdd, qEven], [0, 1], qEven, QEven, {qEven, qOdd, 1}, {qOdd, qEven}}
// 000011
// 00101

export class Automaton {
  public currentState: string;

  constructor(public states: Array<string>, public alphabet: Array<any>, public initialState: string, public goalStates: Array<string>, public transitions: Array<Transition>, public isNFA = false) {
    this.currentState = this.initialState;
  }

  public setToInitialState(): void {
    this.currentState = this.initialState;
  };

  public accepts(){
    return this.goalStates.includes(this.currentState)
  }

  public checkInput(input) {
    this.setToInitialState()
    if(this.accepts() && input.length === 0) {
      return true;
    }
    const inputArr = input.split('')
    while(inputArr.length !== 0) {
      const allTransitions = this.transitions.filter(t => t.transitionFrom == this.currentState && t.label == inputArr[0])
      if(allTransitions.length === 0) {
        return this.accepts();
      }
      else {
        this.currentState = allTransitions[0].transitionTo
        inputArr.shift()
      }
    }
    return this.accepts()
  }

}

export class Transition {
  constructor(public transitionFrom, public transitionTo, public label) {}
}

const states = ['qOdd', 'qEven'];
const alphabet = [0, 1]
const initialState = 'qEven';
const goalStates = ['qEven'];
let tf = [];

const t1 = new Transition('qEven', 'qOdd', '1')
const t2 = new Transition('qOdd', 'qEven', '1')
const t3 = new Transition('qOdd', 'qOdd', '0')
const t4 = new Transition('qEven', 'qEven', '0')
tf.push(t1, t2, t3, t4)

const automaton = new Automaton(states, alphabet, initialState, goalStates, tf)

// console.log(automaton.checkInput(''))
// console.log(automaton.checkInput('1'))
// console.log(automaton.checkInput('10'))
// console.log(automaton.checkInput('11'))
// console.log(automaton.checkInput('111'))
// console.log(automaton.checkInput('1111'))
