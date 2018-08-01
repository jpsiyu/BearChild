import React from 'react'
import macro from './macro'
import Game from './game';
import { setContext, storeState } from './store'

class MainScene extends React.Component {
    constructor() {
        super()
        this.canvas = undefined
        this.state = {
            marginLeft: 0,
            marginTop: 0,
            innerWidth: 0,
            innerHeight: 0,
        }
        this.game = undefined
    }

    componentDidMount() {
        this.div = this.refs.div
        this.div.addEventListener('touchstart', event => { event.preventDefault() })
        this.canvas = this.refs.canvasGame
        this.canvas.focus()
        this.context = this.canvas.getContext('2d')
        setContext(this.context)

        this.resizeCanvas()

        document.addEventListener('visibilitychange', () => {
            document.hidden ? storeState().music.pauseBg() : storeState().music.playBg()
            this.game.setPause(document.hidden)
        })
        window.addEventListener('resize', ev => { this.resizeCanvas() })
        window.addEventListener('orientationchange', ev => { setTimeout(() => { this.resizeCanvas() }, 200); })

        this.startLoading()
    }

    startLoading(){
        this.game = new Game(this.context)
        this.game.startLoad()
    }

    resizeCanvas() {
        const updateState = {}

        const curruntRatio = (window.innerWidth / window.innerHeight)
        if (curruntRatio > macro.WidthHeightRatio) {
            this.canvas.height = window.innerHeight
            this.canvas.width = this.canvas.height * macro.WidthHeightRatio
        } else {
            this.canvas.width = window.innerWidth
            this.canvas.height = this.canvas.width / macro.WidthHeightRatio
        }

        const size = this.canvas.width / macro.GridNumInRow
        this.canvas.height -= this.canvas.height % size

        updateState.marginLeft = (window.innerWidth - this.canvas.width) / 2
        updateState.marginTop = (window.innerHeight - this.canvas.height) / 2
        updateState.innerWidth = window.innerWidth
        updateState.innerHeight = window.innerHeight
        this.setState(updateState)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 200);
    }

    render() {
        return <div ref='div' style={{ backgroundColor: 'black', width: this.state.innerWidth, height: this.state.innerHeight }}>
            <canvas ref='canvasGame'
                style={{ backgroundColor: 'black', marginTop: this.state.marginTop, marginLeft: this.state.marginLeft }}>
            </canvas>
        </div>
    }
}

export default MainScene