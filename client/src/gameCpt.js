import React from 'react'
import macro from './macro'
import Game from './game';
import { setContext, storeState } from './store'

class GameCpt extends React.Component {
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
        this.resizeCanvas()
        window.addEventListener('resize', ev => { this.resizeCanvas() })
        window.addEventListener('orientationchange', ev => {
            setTimeout(() => {
                this.resizeCanvas()
            }, 200);
            setTimeout(() => {
                window.scrollTo(0, 1)
            }, 300)
        })
        const context = this.canvas.getContext('2d')
        setContext(context)
        this.game = new Game(context)
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
    }

    render() {
        return <div ref='div' style={{ backgroundColor: 'black', width: this.state.innerWidth, height: this.state.innerHeight }}>
            <canvas ref='canvasGame'
                style={{ backgroundColor: 'black', marginTop: this.state.marginTop, marginLeft: this.state.marginLeft }}>
            </canvas>
        </div>
    }
}

export default GameCpt