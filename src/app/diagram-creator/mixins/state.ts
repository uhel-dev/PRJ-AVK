import {Connection} from 'jsplumb';



export class State {

  stateRadius = 30

  name: string = "";
  isInitial: boolean;
  isAcceptable: boolean;
  // y
  top?: number;
  // x
  left?: number;
  mouseOffsetY?: number;
  mouseOffsetX?: number;

  caretVisible?: boolean = true;

  constructor() {}

  setMouseStart(left: number, top: number): void {
    this.mouseOffsetX = this.left - left;
    this.mouseOffsetY = this.top - top;
  }

  setAnchorPoint(left, top): void {
    this.left = left + this.mouseOffsetX;
    this.top = top + this.mouseOffsetY;
  }

  draw(ctx: CanvasRenderingContext2D) {

    // ctx draws the circle with radius 30
    ctx.beginPath()
    ctx.arc(this.left, this.top, this.stateRadius, 0, 2 * Math.PI, false)
    ctx.stroke()

    // ctx draws the text
    this.drawText(ctx, this.name, this.left, this.top, null, this)

    if(this.isAcceptable) {
      ctx.beginPath();
      ctx.arc(this.left, this.top, this.stateRadius - 5, 0, 2 * Math.PI, false)
      ctx.stroke()
    }
  }


  drawText(ctx, text, x, y, angleOrNull, isSelected) {
    ctx.font = '20px "Times New Roman", serif';
    let width = ctx.measureText(text).width

    //center the text
    x -= width / 2;

    if(angleOrNull !== null) {
      let cos = Math.cos(angleOrNull);
      let sin = Math.sin(angleOrNull);
      let cornerPointX = (width / 2 + 5);
      let cornerPointY = (10 + 5);

      if(cos > 0) cornerPointX = cornerPointX * (1);
      else cornerPointX = cornerPointX * (-1);

      if(sin > 0) cornerPointY = cornerPointY * (1);
      else cornerPointY = cornerPointY * (-1);

      let slide = sin * Math.pow( Math.abs(sin), 40) * cornerPointX - cos * Math.pow(Math.abs(cos), 10) * cornerPointY;
      x += cornerPointX - sin * slide;
      y += cornerPointY + cos * slide;
    }

    if('advancedFillText' in ctx) {
      ctx.advanceFillText(text, text, x + width / 2, y, angleOrNull)
    }
    else {
       x = Math.round(x)
       y = Math.round(y)
      ctx.fillText(text, x, y + 6)
      if(isSelected && this.caretVisible && this.isCanvasFocused() && document.hasFocus()) {
       x += width;
       ctx.beginPath();
       ctx.moveTo(x, y - 10)
        ctx.moveTo(x, y + 10)
      }
    }
  }

  closestPointOnCircle(x, y) {
    let dx = x - this.left;
    let dy = y - this.top

    let scale = Math.sqrt(dx * dx + dy * dy)

    return {'x': this.left + dx * 30 / scale, 'y': this.top + dy * 30}
  }

  containsPoint(x, y) {
    return Math.pow((x - this.left), 2) + Math.pow((y - this.top), 2) <  Math.pow(this.stateRadius, 2)
  }

  isCanvasFocused() {
    return (document.body || document.activeElement) == document.body;
  }


}



export class StateTransition {
  label?;
  connection?;
  labels?;

}


