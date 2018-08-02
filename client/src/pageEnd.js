import tool from './tool'
import drawing from './drawing'
import macro from './macro'
import Page from './page'

class PageEnd extends Page {
    constructor() {
        super()
        this.mainText = 'Game Over'
        this.quitText = 'Quit'
        this.restartText = 'Restart'
        this.quitRect = undefined
        this.restartRect = undefined
    }

    draw(context) {
        if (window.g.gameState !== macro.StateGameOver)
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
        let rw = gridSize * 1.5

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
        pos = { x: -gridSize, y: 1.5*gridSize }
        context.beginPath()
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        context.fillStyle = 'black'
        context.rect(-rw / 2, -rw / 2, rw, rw)
        this.quitRect = {
            x: absPos.x - rw / 2,
            y: absPos.y - rw / 2,
            w: rw,
            h: rw,
        }
        context.fill()
        drawing.drawLabel(context, '<', 0, mainPt/ 2, { color: 'white', pt: mainPt})
        context.translate(-pos.x, -pos.y)
        absPos = this.posMin(absPos, pos)

        //btn reload
        pos = { x: gridSize, y: 1.5*gridSize }
        context.beginPath()
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        context.fillStyle = 'black'
        context.rect(-rw / 2, -rw / 2, rw, rw)
        this.restartRect = {
            x: absPos.x - rw / 2,
            y: absPos.y - rw / 2,
            w: rw,
            h: rw,
        }
        context.fill()
        drawing.drawLabel(context, '↺', 0, mainPt/ 2, { color: 'white', pt: mainPt})
        context.translate(-pos.x, -pos.y)
        absPos = this.posMin(absPos, pos)

        //sub text
        pos = { x: -gridSize, y: 2.2 * gridSize }
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        drawing.drawLabel(context, this.quitText, 0, mainPt, { pt: subPt })
        context.translate(-pos.x, -pos.y)
        absPos = this.posMin(absPos, pos)

        pos = { x: gridSize, y: 2.2 * gridSize }
        context.translate(pos.x, pos.y)
        absPos = this.posAdd(absPos, pos)
        drawing.drawLabel(context, this.restartText, 0, mainPt, { pt: subPt })
        absPos = this.posMin(absPos, pos)

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
        window.g.gameEventListener.dispatch(macro.EventReady)
        this.hide()
    }

    restart() {
        window.g.gameEventListener.dispatch(macro.EventRestart)
        this.hide()
    }
}

export default PageEnd