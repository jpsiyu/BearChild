import React from 'react'
import macro from './macro'
import Game from './game';

class GameCpt extends React.Component {
    constructor() {
        super()
    }

    componentDidMount(){
        const context = this.refs.canvas.getContext('2d')
        const game = new Game(context)
    }

    render() {
        return <canvas
            ref='canvas'
            style={{backgroundColor:'black'}}
            width={macro.Width}
            height={macro.Height}>
        </canvas>
    }
}

export default GameCpt