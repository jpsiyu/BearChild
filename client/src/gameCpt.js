import React from 'react'
import macro from './macro'
import Game from './game';
import { setContext } from './store'

class GameCpt extends React.Component {
    constructor() {
        super()
        this.canvas = undefined
        this.state = {
            marginLeft: 0,
            marginTop: 0,
        }
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
        const curruntRatio = (window.innerWidth / window.innerHeight)
        if (curruntRatio > macro.WidthHeightRatio) {
            this.canvas.height = window.innerHeight
            this.canvas.width = this.canvas.height * macro.WidthHeightRatio
            this.setState({
                marginLeft: (window.innerWidth - this.canvas.width) / 2
            })
        } else {
            this.canvas.width = window.innerWidth
            this.canvas.height = this.canvas.width / macro.WidthHeightRatio
        }
        const size = this.canvas.width / macro.GridNumInRow
        this.canvas.height -= this.canvas.height % size
        this.setState({
            marginTop: (window.innerHeight - this.canvas.height) / 2
        })
    }

    render() {
        return <canvas
            ref='canvas'
            style={{ backgroundColor: 'black', marginLeft: this.state.marginLeft, marginTop: this.state.marginTop }}>
        </canvas>
    }
}

export default GameCpt