import React from 'react'
import macro from './macro'
import Game from './game';
import {setContext} from './store'

class GameCpt extends React.Component {
    constructor() {
        super()
        this.canvas = undefined
    }

    componentDidMount() {
        this.canvas = this.refs.canvas
        this.resizeCanvas()
        window.addEventListener('resize', ev => { this.resizeCanvas() })
        const context = this.canvas.getContext('2d')
        setContext(context)
        const game = new Game(context)
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth
        const gridSize = this.canvas.width / macro.GridNumInRow
        const h = window.innerHeight - 50
        this.canvas.height = h - h % gridSize
        /*
        const curruntRatio = (window.innerWidth / window.innerHeight)
        if (curruntRatio > macro.WidthHeightRatio) {
            this.canvas.height = window.innerHeight
            this.canvas.width = this.canvas.height * macro.WidthHeightRatio
        } else {
            this.canvas.width = window.innerWidth
            this.canvas.height = this.canvas.width / macro.WidthHeightRatio
        }
        */
    }

    render() {
        return <canvas className='ml-0'
            ref='canvas'
            style={{ backgroundColor: 'black', marginLeft: macro.CanvasMargin }}>
        </canvas>
    }
}

export default GameCpt