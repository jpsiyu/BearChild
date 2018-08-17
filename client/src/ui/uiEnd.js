import React from 'react'
import macro from '../macro'

class UIEnd extends React.Component {
    constructor() {
        super()
        this.quitSymbol = '<'
        this.restartSymbol = '↺'
        this.onBtnQuitClick = this.onBtnQuitClick.bind(this)
        this.onBtnRestartClick = this.onBtnRestartClick.bind(this)
    }


    onBtnQuitClick() {
        window.g.gameEventListener.dispatch(macro.EventReady)
        window.g.uiMgr.hide(macro.UIEnd)
    }

    onBtnRestartClick() {
        window.g.gameEventListener.dispatch(macro.EventRestart)
        window.g.uiMgr.hide(macro.UIEnd)
    }

    render() {
        return <div className='uiPop UIEnd'>
            <h2>Game Over</h2>
            <div className='btnContainer'>
                <div className='btnGroup'>
                    <button className='btn' onClick={this.onBtnQuitClick}>{this.quitSymbol}</button>
                    <label>Quit</label>
                </div>
                <div className='btnGroup'>
                    <button className='btn' onClick={this.onBtnRestartClick}>{this.restartSymbol}</button>
                    <label>Restart</label>
                </div>
            </div>
        </div>
    }
}

export default UIEnd