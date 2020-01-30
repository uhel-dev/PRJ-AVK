import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewStateDialogComponent} from './new-state-dialog/new-state-dialog.component';
import {State, StateTransition} from './mixins/state';
import {RenameStateDialogComponent} from './rename-state-dialog/rename-state-dialog.component';
import {ConnectDialogComponent} from './connect-dialog/connect-dialog.component';
import * as jsPlumb from 'jsplumb';

@Injectable({
  providedIn: 'root'
})
export class DialogsManagerService {

  constructor(public dialog: MatDialog) { }

  openNewStateDialog(x: number, y: number, states: Array<State>): boolean {
    // create data object passed into the dialog
    const dataIn = { states: states};
    // create dialog config object
    const dialogConfig = DialogsManagerService.getDialogGlobalConfigs(dataIn)
    // create new instance of dialog
    const dialogRef = this.dialog.open(NewStateDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const isDuplicate = states.filter(state => state.name === result.name).length > 0

        // Avoid creating duplicate states
        if(!isDuplicate) {

          // If there is already existing initial state, then remove all other initial state markers,
          // and set marker to the current state.
          if(result.isInitialState === true) {
            const currentInitialState = states.filter(s => s.isInitial)
            currentInitialState.forEach(state => state.isInitial = false)
          }
          if(states.length != 20) {
            // const newState: State = {name: result.name, isAcceptable: result.isAcceptableState, isInitial: result.isInitialState, top: y, left: x}
            // states.push(newState)
            return true
          }
        }
      }
    })
    return false
  }

  openRenameStateDialog(stateName: string, states: Array<State>): void {
    // create data object passed into the dialog
    const dataIn = {states: states, StateName: stateName}
    // create dialog config object
    const dialogConfig = DialogsManagerService.getDialogGlobalConfigs(dataIn)
    // create new instance of dialog
    const dialogRef = this.dialog.open(RenameStateDialogComponent, dialogConfig)

    // after closing down the dialog, rename the state name.
    dialogRef.afterClosed().subscribe(result => {
      let state = states.filter(state => state.name === stateName)[0]
      if (result && result !== '') {
        state.name = result
      }
    })
  }

  openConnectStatesDialog(event, stateName: string, states: Array<State>, transitions: Array<StateTransition>, connection, jsPlumbInstance): void {
    const dataIn = {states: states, stateName: stateName}
    const dialogConfig = DialogsManagerService.getDialogGlobalConfigs(dataIn)
    const dialogRef = this.dialog.open(ConnectDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let transitionFrom = event.sourceId
        let transitionTo = event.targetId


        let sameSourceAndTargetList = transitions.filter(transition => transition.connection.targetId === transitionTo &&
                                                                                 transition.connection.sourceId === transitionFrom);

        let sameSourceAndTargetAndLabelList = sameSourceAndTargetList.filter(transition => transition.label === result);
        console.log('all connections')
        jsPlumbInstance.getAllConnections().forEach(el => console.log(el))
        console.log('transitions')
        console.log(transitions)


        console.log('sourceId')
        console.log(transitionFrom)

        console.log('sourceId')
        console.log(transitionTo)

        console.log("all same source and target el")
        sameSourceAndTargetList.forEach(el => console.log(el))


        // if source and target are the same and label is the same
          // just remove the connection
        if(sameSourceAndTargetAndLabelList[0]) {
          jsPlumbInstance.deleteConnection(connection)
        }


        // if source and target are the same and label is different
          // append the label and labels, dont use the new connection,
        else if (sameSourceAndTargetList[0] && !sameSourceAndTargetAndLabelList[0]) {
          let latestLabel = sameSourceAndTargetList[sameSourceAndTargetList.length - 1].label;
          let newestLabel = latestLabel + " | " + result;
          // console.log(jsPlumb)
          // jsPlumbInstance.getAllConnections().forEach(el => {

            // console.log('el')
            // console.log(el)
          // })
          //
          jsPlumbInstance.deleteConnection(sameSourceAndTargetList[sameSourceAndTargetList.length - 1])
          //   console.log('will hide')
          //   console.log(el.sourceId)
          //   jsPlumbInstance.hide(el.sourceId)
          //   console.log('will hide')
          //   console.log(el.targetId)
          //   jsPlumbInstance.hide(el.targetId)
          //
          // });


           transitions.push({connection: event.connection, label: newestLabel, labels: newestLabel.split(' | ')})
           connection.addOverlay([ "Arrow", { location: 1, id: "arrow"}])
           connection.addOverlay([ "Label", { location: 0.5, label: newestLabel, id: "stateName", cssClass: "aLabel"}])
           connection.setVisible('true')
        }

        // otherwise is a new normal connection
        else {
          transitions.push({connection: event.connection, label: result, labels: result.split(' | ')})
          connection.addOverlay([ "Arrow", { location: 1, id: "arrow"}])
          connection.addOverlay([ "Label", { location: 0.5, label: result, id: "stateName", cssClass: "aLabel"}])
          connection.setVisible('true')
        }



        //
        //
        //     let transitionWithTheSameLabel = transitions.filter(t => t.connection.targetId === connection.targetId && t.connection.sourceId === connection.sourceId && result === t.label)[0]
        //     let filtered = transitions.filter(t => t.connection.sourceId === connection.sourceId && t.connection.targetId == connection.targetId )
        //     let transitionWithTheSameSourceAndTargetButDifferentLabel = filtered[filtered.length - 1]
        //
        //     if(transitionWithTheSameSourceAndTargetButDifferentLabel) {
        //       result = transitionWithTheSameSourceAndTargetButDifferentLabel.label + ' | ' + result
        //       console.log(jsPlumbInstance.getAllConnections())
        //       console.log(transitionWithTheSameSourceAndTargetButDifferentLabel.connection)
        //       transitions = transitions.filter(t => t.connection !== transitionWithTheSameSourceAndTargetButDifferentLabel.connection)
        //       jsPlumbInstance.hide(transitionWithTheSameSourceAndTargetButDifferentLabel.connection.source)
        //       jsPlumbInstance.hide(transitionWithTheSameSourceAndTargetButDifferentLabel.connection.targetId)
        //       connection.setVisible(true);
        //       connection.addOverlay([ "Arrow", { location: 1, id: "arrow"}])
        //       connection.addOverlay([ "Label", { location: 0.5, label: result, id: "stateName", cssClass: "aLabel"}])
        //       transitions.push({connection: connection, label: result, labels: result.split(' | ')})
        //     }
        //
        //     else if(!transitionWithTheSameLabel) {
        //       connection.addOverlay([ "Arrow", { location: 1, id: "arrow"}])
        //       connection.addOverlay([ "Label", { location: 0.5, label: result, id: "stateName", cssClass: "aLabel"}])
        //       transitions.push({connection: connection, label: result, labels: result.split(' | ')})
        //     }
        //     else {
        //       jsPlumbInstance.deleteConnection(connection)
        //       transitions = transitions.filter(t => t.connection !== connection)
        //     }
        //   }
        //   else {
        //     jsPlumbInstance.deleteConnection(connection)
        //     transitions = transitions.filter(t => t.connection !== connection)
        //   }
        // })

      }
    })
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
