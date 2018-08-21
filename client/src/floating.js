import tool from './tool'
import Element from './element'
import macro from './macro'

class Floating extends Element {
    constructor(x, y, score) {
        const radius = tool.gridSize()/2
        super(x, y, radius)
        this.score = score
        this.showTime = 0.3
        this.pass = 0
        this.speed = 100
        this.active = true
    }

    reset(x, y, score){
        this.x = x
        this.y = y
        this.score = score
        this.pass = 0
        this.active = true
    }

    update(elapsed) { 
        if(!this.active) return

        if(this.pass < this.showTime){
            this.pass += elapsed
            this.y -= elapsed * this.speed
        }else{
            this.active = false
        }
    }

    getColor(){
        let c = 'red'
        switch(this.score){
            case macro.ScoreMilk:
                c = 'blue'
                break
            case macro.ScoreFence:
                c = 'blue'
                break
            case macro.ScoreLevel:
                c = 'yellow'
                break
            default:
                c = 'red'
                break
        }
        return c
    }

    draw(context) {
        if(!this.active) return
        context.save()
        context.translate(this.x, this.y)
        context.fillStyle = `${this.getColor()}`
        context.font = '23pt Arial'
        context.fillText(`+${this.score}`, 0, 0)
        context.restore()
    }
}

export default Floating