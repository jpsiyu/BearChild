import macro from './macro'

const drawGrid = (context) => {
    const w = context.canvas.width
    const h = context.canvas.height

    context.save()
    context.lineWidth = 0.1
    context.strokeStyle = '#000000'
    context.beginPath()
    for (let i = 0; i <= h; i += macro.GridSize) {
        context.moveTo(0, i)
        context.lineTo(w, i)
    }
    for (let i = 0; i <= w; i += macro.GridSize) {
        context.moveTo(i, 0)
        context.lineTo(i, h)
    }
    context.stroke()
    context.restore()
}

const drawCover = (context, color) => {
    color = color || 'yellow'
    context.save()
    context.beginPath()
    context.fillStyle = color
    context.rect(0, 0, context.canvas.width, context.canvas.height)
    context.fill()
    context.restore()
}

const drawCoverUpRight = (context, color, x, y) => {
    color = color || 'yellow'
    context.save()
    context.beginPath()
    context.fillStyle = color
    context.rect(x, 0, context.canvas.width-x, y)
    context.fill()
    context.restore()
}

const drawImg = (context, x, y, radius, img, guide=false) => {
    context.save()
    if(img && img.complete)
        context.drawImage(img, x, y, 2*radius, 2*radius)
    if(guide){
        context.beginPath()
        context.strokeStyle = 'red'
        context.arc(0, 0, radius, 0, 2*Math.PI)
        context.stroke()
    }

    context.restore()
}

const drawReachable = (context) => {
    context.save()
    context.fillStyle = 'rgba(240, 240, 240, 0.2)'
    context.rect(0, 0, context.canvas.width, context.canvas.height)
    context.fill()
    context.restore()
}

const drawLabel = (context, label, x, y, options) => {
    context.save()
    options = options || {}
    const pt = options.pt || 10
    context.fillStyle = 'black'
    context.textAlign = 'center'
    context.font = `${pt}pt Arial`
    context.fillText(label, x, y)
    context.restore()
}

export default {
    drawGrid,
    drawImg,
    drawReachable,
    drawCover,
    drawCoverUpRight,
    drawLabel,
}