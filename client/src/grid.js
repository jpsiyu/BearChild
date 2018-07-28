import drawing from './drawing'
import macro from './macro'

class Grid {
    draw(context, child) {
        context.save()
        drawing.drawCover(context, 'rgb(238, 217, 255')
        const h = macro.GridSize / 2
        drawing.drawGrid(context)
        context.restore()
    }

    drawMask(context, child) {
        context.save()
        const h = macro.GridSize / 2
        drawing.drawCoverRight(
            context,
            'rgb(240, 240, 240)',
            child.x - h + macro.GridSize * macro.Visiable,
        )
        drawing.drawCoverTop(
            context,
            'rgb(240, 240, 240)',
            child.y + h - macro.GridSize * macro.Visiable,
        )
        context.restore()
    }
}

export { Grid }