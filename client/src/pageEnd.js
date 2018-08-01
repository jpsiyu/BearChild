import tool from './tool'
import drawing from './drawing'
import { storeState } from './store'
import macro from './macro'

class PageEnd {
    constructor() {
        this.mainText = 'Game Over'
        this.subText = 'Quit              Restart'
        this.quitRect = undefined
        this.restartRect = undefined
    }

    setRestartHandler(restartHandler) {
        this.restartHandler = restartHandler
    }

    draw(context) {
        if (storeState().gameState !== macro.StateGameOver)
            return

        const basePos = {
            x: tool.gameWidth() / 2,
            y: tool.gameHeight() / 2
        }

        const gridSize = tool.gridSize()
        const mainPt = gridSize / 2
        const subPt = mainPt / 2
        const tw = gridSize * 4
        const th = gridSize * 2
        let pos, absPos = { x: 0, y: 0 }

        //bg
        pos = { x: basePos.x, y: basePos.y - gridSize }
        context.save()
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        context.beginPath()
        context.fillStyle = 'rgba(255, 255, 0, 0.8)'
        context.rect(-tw, -th / 2, 2 * tw, 2 * th)
        context.fill()

        //main text
        drawing.drawLabel(context, this.mainText, 0, 0, { pt: mainPt })

        //btn quit
        pos = { x: -gridSize, y: gridSize }
        context.beginPath()
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        context.fillStyle = 'black'
        context.rect(-gridSize / 2, -gridSize / 2, gridSize, gridSize)
        this.quitRect = {
            x: absPos.x - gridSize / 2,
            y: absPos.y - gridSize / 2,
            w: gridSize,
            h: gridSize,
        }
        context.fill()
        drawing.drawLabel(context, '<', 0, subPt / 2, { color: 'white', pt: subPt })
        context.translate(-pos.x, -pos.y)
        absPos = this.posMin(absPos, pos)

        //btn reload
        pos = { x: gridSize, y: gridSize }
        context.beginPath()
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        context.fillStyle = 'black'
        context.rect(-gridSize / 2, -gridSize / 2, gridSize, gridSize)
        this.restartRect = {
            x: absPos.x - gridSize / 2,
            y: absPos.y - gridSize / 2,
            w: gridSize,
            h: gridSize,
        }
        context.fill()
        drawing.drawLabel(context, '↺', 0, subPt / 2, { color: 'white', pt: subPt })
        context.translate(-pos.x, -pos.y)
        absPos = this.posMin(absPos, pos)

        //sub text
        pos = { x: 0, y: 1.5 * gridSize }
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        drawing.drawLabel(context, this.subText, 0, mainPt, { pt: subPt })

        context.restore()
    }

    posAdd(a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
        }
    }

    posMin(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
        }
    }

    handleClick(pos) {
        let rectInfo = this.quitRect
        if (pos.x > rectInfo.x && pos.x < rectInfo.x + rectInfo.w &&
            pos.y > rectInfo.y && pos.y < rectInfo.y + rectInfo.h)
            this.quit()
        rectInfo = this.restartRect
        if (pos.x > rectInfo.x && pos.x < rectInfo.x + rectInfo.w &&
            pos.y > rectInfo.y && pos.y < rectInfo.y + rectInfo.h)
            this.restart()

    }


    quit() {
    }

    restart() {
        this.restartHandler()
    }
}

export default PageEnd