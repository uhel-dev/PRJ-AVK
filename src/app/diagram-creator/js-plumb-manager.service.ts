import {Injectable} from '@angular/core';
import {jsPlumb, jsPlumbInstance} from 'jsplumb';
import {DialogsManagerService} from './dialogs-manager.service';
import {StateTransition} from './mixins/state';

@Injectable({
  providedIn: 'root'
})
export class JsPlumbManagerService{

  private jsPlumbInstance: jsPlumbInstance

  constructor(public dialogsManagerService: DialogsManagerService) {
  }


  endpointParameterSource = {
    isSource: true,
    endpoint: ["Dot", {radius: 5}],
    // endpoint: "Blank",
    // connector:["StateMachine", { curviness: 180, proximityLimit: 300, loopbackRadius: 25},],
    connector:["StateMachine", { curviness: 0, proximityLimit: 300, loopbackRadius: 25},],
    connectorStyle: { stroke: "#000000", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
    // anchor: "Continuous",
    anchor:[ "Perimeter", { shape:"Diamond", anchorCount:150 }]
  };

  endpointParameterTarget = {
    isTarget: true,
    endpoint: ["Dot", {radius: 5}],
    // endpoint: "Blank",
    // anchor: "Continuous",
    anchor:[ "Perimeter", { shape:"Diamond", anchorCount:150 }]
  };

  setUpJsPlumbInstance() {
    this.jsPlumbInstance = jsPlumb.getInstance({
      Container:'diagram-boundary-id'
    });
    this.jsPlumbInstance.importDefaults({
      ConnectionsDetachable:false
    });
  }


  makeElementASource(stateName, stateEl, canvas): void {
    this.jsPlumbInstance.draggable(stateEl, {containment: canvas})
    this.jsPlumbInstance.makeSource(stateName, this.endpointParameterSource)
  }


  makeElementATarget(stateName): void {
    this.jsPlumbInstance.makeTarget(stateName, this.endpointParameterTarget)
  }

  bindCustomConnectionEvent(states, transitions) {
    // this.jsPlumbInstance.bind('connection', (event, ev) => {
    //   if(ev.shiftKey) {
    //     // this.dialogsManagerService.openConnectStatesDialog(event, event.sourceId, states, transitions, event.connection, this.jsPlumbInstance)
    //     // event.connection.bind('click', (conn, event) => {
    //       // console.log(conn)
    //       // let x = event.path[1]
    //       // console.log(x)
    //       // let p: SVGPathElement = x.getElementsByTagName("path").item(1)
    //       // let pAttributes = p.getAttributeNode('d').value.split(' ')
    //       // console.log(pAttributes)
    //       //
    //
    //       // create source anchor
    //       // let p1 = x.getElementById('p1')
    //       // if(p1) {
    //       //   p1.setAttributeNS(null, 'cx', pAttributes[4])
    //       //   p1.setAttributeNS(null, 'cy', pAttributes[5])
    //       //   p1.setAttributeNS(null, 'r', '8')
    //       // }
    //       // else {
    //       //   let p1 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    //       //   p1.setAttributeNS(null, 'id', 'p1')
    //       //   p1.setAttributeNS(null, 'cx', pAttributes[4])
    //       //   p1.setAttributeNS(null, 'cy', pAttributes[5])
    //       //   p1.setAttributeNS(null, 'r', '8')
    //       //   x.appendChild(p1)
    //       // }
    //       //
    //       // // create target anchor
    //       // let p2 = x.getElementById('p2')
    //       // if(p2) {
    //       //   p2.setAttributeNS(null, 'cx', pAttributes[6])
    //       //   p2.setAttributeNS(null, 'cy', pAttributes[7])
    //       //   p2.setAttributeNS(null, 'r', '8')
    //       // }
    //     //   // else {
    //     //     let p2 = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    //     //     p2.setAttributeNS(null, 'id', 'p2')
    //     //     p2.setAttributeNS(null, 'cx', pAttributes[6])
    //     //     p2.setAttributeNS(null, 'cy', pAttributes[7])
    //     //     p2.setAttributeNS(null, 'r', '8')
    //     //     x.appendChild(p2)
    //     //   // }
    //     //
    //     //
    //     //
    //     //   //
    //     //   if(event.shiftKey) {
    //     //     console.log('delete connection ', conn)
    //     //     const connectionIdToBeDeleted = conn.id
    //     //     this.jsPlumbInstance.deleteConnection(conn)
    //     //     transitions = transitions.filter(t => t.connection.id !== connectionIdToBeDeleted)
    //     //   }
    //     // })
    //   }
    //   else this.jsPlumbInstance.deleteConnection(event.connection)
    // })
  }


  bindCustomConnectionDetachedEvent(transitions) {
    this.jsPlumbInstance.bind('connectionDetached', (event) => {
      transitions = transitions.filter(transition => transition.connection.id !== event.connection.id)
    });
  }

  restartCanvas() {
    if(confirm("Are you sure to delete all transitions?")) {
      this.jsPlumbInstance.deleteEveryConnection()
    }
  }
}
