import drawing from './drawing'
import macro from './macro'
import Element from './element'
import tool from './tool'

class Button extends Element {
    constructor(x, y, childHandler) {
        const radius = macro.GridSize / 2
        super(x, y, radius)
        this.childHandler = childHandler
        this.posArrowUp = tool.grid2coord(tool.maxRow() - 1, tool.maxCol())
        this.posArrowRight = tool.grid2coord(tool.maxRow(), tool.maxCol())
    }

    update() { }

    draw(context) {
        this.drawArrow(context, this.posArrowUp, '↑')
        this.drawArrow(context, this.posArrowRight, '→')
    }

    drawArrow(context, pos, arrow) {
        context.save()
        context.translate(pos.x, pos.y)
        drawing.drawButton(context, this.radius, arrow)
        context.restore()
    }

    arrowRightClick(){
        const c = this.childHandler()
        if(c){
            c.moveRight()
        }
    }

    arrowUpClick(){
        const c = this.childHandler()
        if(c){
            c.moveUp()
        }
    }

    handleClick(pos) {
        let distance

        distance = tool.distancePos(pos, this.posArrowUp)
        if(distance < this.radius) this.arrowUpClick()

        distance = tool.distancePos(pos, this.posArrowRight)
        if(distance < this.radius) this.arrowRightClick()
    }

}

export default Button