import drawing from './drawing'
import macro from './macro'
import tool from './tool'

class Grid {
    constructor() {
        this.xCover = 0
        this.yCover = 0
    }


    update(elapsed, child) {
        const gridSize = tool.gridSize()
        this.xCover = child.x - gridSize / 2 + gridSize * macro.Visiable
        this.yCover = child.y + gridSize / 2 - gridSize * macro.Visiable
    }

    draw(context) {
        context.save()
        drawing.drawCover(context, macro.BgColor)
        drawing.drawGrid(context)
        context.restore()
    }

    drawMask(context) {
        context.save()
        drawing.drawCoverRight(
            context,
            'rgb(240, 240, 240)',
            this.xCover,
        )
        drawing.drawCoverTop(
            context,
            'rgb(240, 240, 240)',
            this.yCover
        )
        context.restore()
        this.drawCloud(context)
    }

    drawCloud(context) {
    }
}

export { Grid }