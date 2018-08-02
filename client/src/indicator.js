class Indicator {
    constructor(label, posCallback) {
        this.posCallback = posCallback
        this.label = label
        this.updatePos()
    }

    setPosCallback(callback){
        this.posCallback = callback
    }

    updatePos(){
        const info = this.posCallback()
        this.x = info.x
        this.y = info.y
        this.width = info.width
        this.height = info.height
    }

    update(elpased){
        this.updatePos()
    }

    draw(ctx, cur, max) {
        ctx.save()
        ctx.strokeStyle = 'white'
        ctx.fillStyle = 'white'
        ctx.font = `${this.height}pt Arial`
        const offset = ctx.measureText(this.label).width
        ctx.fillText(this.label, this.x, this.y + this.height - 1)
        ctx.beginPath()
        ctx.rect(offset + this.x, this.y, this.width, this.height)
        ctx.stroke()
        ctx.beginPath()
        ctx.rect(offset + this.x, this.y, this.width * (cur / max), this.height)
        ctx.fill()
        ctx.restore()
    }
}

class NumberIndicator {
    constructor(label, x, y, options) {
        options = options || {}
        this.label = label
        this.x = x
        this.y = y
        this.digits = options.digits || 0
        this.pt = options.pt || 8
        this.align = options.align || 'end'
    }

    draw(ctx, value) {
        ctx.save()
        ctx.fillStyle = 'black'
        ctx.font = `${this.pt}pt Arial`
        ctx.textAlign = this.align
        ctx.fillText(`${this.label} ${value.toFixed(this.digits)}`, this.x, this.y + this.pt - 1)
        ctx.restore()
    }
}

export { Indicator, NumberIndicator}