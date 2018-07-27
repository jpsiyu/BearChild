import drawing from './drawing'
import macro from './macro'

class Grid {
    draw(context, child) {
        context.save()
        drawing.drawCover(context, 'rgb(255, 218, 229')
        const h = macro.GridSize / 2
        drawing.drawCoverUpRight(context, 'rgb(204, 243, 242)', child.x-h, child.y+h)
        drawing.drawGrid(context)
        context.restore()
    }
}

export {Grid}