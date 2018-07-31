import drawing from './drawing'
import macro from './macro'
import tool from './tool'

class Grid {
    draw(context, child) {
        context.save()
        drawing.drawCover(context, 'rgb(238, 217, 255')
        drawing.drawGrid(context)
        context.restore()
    }

    drawMask(context, child) {
        context.save()
        const gridSize = tool.gridSize(context)
        drawing.drawCoverRight(
            context,
            'rgb(240, 240, 240)',
            child.x - gridSize / 2 + gridSize * macro.Visiable,
        )
        drawing.drawCoverTop(
            context,
            'rgb(240, 240, 240)',
            child.y + gridSize / 2 - gridSize * macro.Visiable,
        )
        context.restore()
    }
}

export { Grid }