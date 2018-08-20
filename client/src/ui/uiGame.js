import React from 'react'
import macro from '../macro'

class UIGame extends React.Component {
    constructor() {
        super()
        this.onBtnRClick = this.onBtnRClick.bind(this)
        this.onBtnUClick = this.onBtnUClick.bind(this)
    }

    onBtnUClick() {
        if(window.g.gameState !== macro.StateGame) return
        window.g.gameAudio.play('click.wav')
        const c = window.g.child
        if (c) {
            c.moveUp()
        }
    }

    onBtnRClick() {
        if(window.g.gameState !== macro.StateGame) return
        window.g.gameAudio.play('click.wav')
        const c = window.g.child
        if (c) {
            c.moveRight()
        }

    }

    render() {
        return <div className='uiFull UIGame'>
            <div className='top'>
                <div className='board'><p>{`uid:${window.g.uid}`}</p></div>
                <div className='board'><p>{`lv:${window.g.gameLv}`}</p></div>
                <div className='board'><p>{`score:0`}</p></div>
            </div>
            <div className='middle'></div>
            <div className='controller'>
                <button className='btn' onClick={this.onBtnUClick} onTouchStart={this.onBtnUClick}>↑</button>
                <button className='btn' onClick={this.onBtnRClick} onTouchStart={this.onBtnRClick}>→</button>
            </div>
        </div>
    }
}

export default UIGame