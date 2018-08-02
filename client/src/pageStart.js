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
        this.rectInfo = undefined
    }

    update(elapsed){
        this.rectInfo = {
            x: tool.gameWidth() / 2 - this.gameTextInfo.text.length * this.gameTextInfo.pt / 2,
            y: tool.gameHeight() / 2 - 1.5 * this.gameTextInfo.pt,
            w: this.gameTextInfo.text.length * this.gameTextInfo.pt,
            h: 2 * this.gameTextInfo.pt,
        }
    }

    draw(context) {
        this.drawStart(context)
    }

    drawStart(context) {
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

    handleClick(pos) {
        if (pos.x > this.rectInfo.x && pos.x < this.rectInfo.x + this.rectInfo.w &&
            pos.y > this.rectInfo.y && pos.y < this.rectInfo.y + this.rectInfo.h)
            this.startGameClick()
    }

    startGameClick() {
        this.hide()
        window.g.music.activeAllMusic()
        window.g.gameEventListener.dispatch(macro.EventRestart)
    }
}

export default PageStart