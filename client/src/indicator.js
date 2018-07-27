class Indicator {
    constructor(label, x, y, width, height) {
        this.label = label
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    draw(ctx, max, level) {
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
        ctx.rect(offset + this.x, this.y, this.width * (max / level), this.height)
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