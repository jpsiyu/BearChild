import tool from './tool'
import drawing from './drawing'
import {storeState} from './store'

class PageStart {
    constructor() {
        this.gameTextInfo = {
            text: 'Start Game',
            pt: 20,
            color: 'white',
        }
        this.rectInfo = {
            x: tool.gameWidth() / 2 - this.gameTextInfo.text.length * this.gameTextInfo.pt / 2,
            y: tool.gameHeight() / 2 - 1.5 * this.gameTextInfo.pt,
            w: this.gameTextInfo.text.length * this.gameTextInfo.pt,
            h: 2 * this.gameTextInfo.pt,
        }
    }

    setRestartHandler(restartHandler) {
        this.restartHandler = restartHandler
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
        this.restartHandler()
        storeState().music.activeAllMusic()
    }
}

export default PageStart