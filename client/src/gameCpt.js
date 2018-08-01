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
        this.canvas = this.refs.canvasGame
        this.resizeCanvas()
        window.addEventListener('resize', ev => { this.resizeCanvas() })
        const context = this.canvas.getContext('2d')
        setContext(context)
        this.game = new Game(context)
    }

    resizeCanvas() {
        const updateState = {}
        const adjWindow = {
            innerWidth: window.innerWidth - 10,
            innerHeight: window.innerHeight - 10,
        }

        const curruntRatio = (adjWindow.innerWidth / adjWindow.innerHeight)
        if (curruntRatio > macro.WidthHeightRatio) {
            this.canvas.height = adjWindow.innerHeight
            this.canvas.width = this.canvas.height * macro.WidthHeightRatio
        } else {
            this.canvas.width = adjWindow.innerWidth
            this.canvas.height = this.canvas.width / macro.WidthHeightRatio
        }

        const size = this.canvas.width / macro.GridNumInRow
        this.canvas.height -= this.canvas.height % size

        updateState.marginLeft = (adjWindow.innerWidth - this.canvas.width) / 2
        updateState.marginTop = (adjWindow.innerHeight - this.canvas.height) / 2
        updateState.innerWidth = adjWindow.innerWidth
        updateState.innerHeight = adjWindow.innerHeight
        this.setState(updateState)
    }

    render() {
        return <div style={{ backgroundColor: 'black', width: this.state.innerWidth, height: this.state.innerHeight}}>
            <canvas ref='canvasGame'
                style={{ backgroundColor: 'black', marginTop: this.state.marginTop, marginLeft: this.state.marginLeft }}>
            </canvas>
        </div>
    }
}

export default GameCpt