import tool from './tool'
import drawing from './drawing'
import macro from './macro';
import Page from './page'

class PageStart extends Page {
    constructor() {
        super()
        this.gameTextInfo = {
            text: 'Start Game',
            pt: 20,
            color: 'white',
        }
        this.setRectInfo()
    }

    update(elapsed) {
        this.setRectInfo()
    }

    setRectInfo() {
        this.rectInfo = {
            x: tool.gameWidth() / 2 - this.gameTextInfo.text.length * this.gameTextInfo.pt / 2,
            y: tool.gameHeight() / 2 - 1.5 * this.gameTextInfo.pt,
            w: this.gameTextInfo.text.length * this.gameTextInfo.pt,
            h: 2 * this.gameTextInfo.pt,
        }
    }

    setMusicSymbolInfo(context) {
        const viewUnit = tool.viewUnit()
        const text = '♬'
        const w = context.measureText(text).width
        const radius = w * 3
        const pt = 30
        this.musicInfo = {
            text: text,
            x: tool.gameWidth() - viewUnit * 2,
            yCircle: tool.gameHeight() / 2 - pt/2,
            yLabel: tool.gameHeight() / 2,
            radius: radius,
            pt: pt,
        }
    }

    draw(context) {
        this.drawStart(context)
        this.drawMusicSymbol(context)
    }

    drawStart(context) {
        if (!this.rectInfo) return
        const x = tool.gameWidth() / 2
        const y = tool.gameHeight() / 2
        context.save()
        drawing.drawLabel(context, this.gameTextInfo.text, x, y, { color: this.gameTextInfo.color, pt: this.gameTextInfo.pt })

        context.beginPath()
        context.strokeStyle = this.gameTextInfo.color
        context.rect(this.rectInfo.x, this.rectInfo.y, this.rectInfo.w, this.rectInfo.h)
        context.stroke()
        context.restore()
    }

    drawMusicSymbol(context) {
        const color = window.g.gameAudio.active ? 'white' : 'gray'
        this.setMusicSymbolInfo(context)

        context.save()
        context.beginPath()
        context.fillStyle = color
        context.strokeStyle = color
        context.arc(this.musicInfo.x, this.musicInfo.yCircle, this.musicInfo.radius, 0, 2 * Math.PI)
        context.stroke()
        context.restore()

        drawing.drawLabel(context, this.musicInfo.text, this.musicInfo.x, this.musicInfo.yLabel,
            { pt: this.musicInfo.pt, color: color }
        )
    }

    handleClick(pos) {
        if (pos.x > this.rectInfo.x && pos.x < this.rectInfo.x + this.rectInfo.w &&
            pos.y > this.rectInfo.y && pos.y < this.rectInfo.y + this.rectInfo.h)
            this.startGameClick()

        if (tool.distancePos(pos, { x: this.musicInfo.x, y: this.musicInfo.yCircle }) < this.musicInfo.radius)
            this.musicClick()
    }

    musicClick() {
        window.g.gameAudio.active = !window.g.gameAudio.active
    }

    startGameClick() {
        this.hide()
        window.g.gameEventListener.dispatch(macro.EventRestart)
    }
}

export default PageStart