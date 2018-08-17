import React from 'react'
import macro from '../macro'

class UIStart extends React.Component {
    constructor(){
        super()
        this.onBtnStartClick = this.onBtnStartClick.bind(this)
        this.onBtnMusicClick = this.onBtnMusicClick.bind(this)
    }

    onBtnStartClick(){
        window.g.uiMgr.hide(macro.UIStart)
        window.g.gameEventListener.dispatch(macro.EventRestart)
    }

    onBtnMusicClick(){
        window.g.gameAudio.active = !window.g.gameAudio.active
    }

    render() {
        return <div className='UIStart uiFull'>
            <div className='left'></div>
            <div className='mid'>
                <button onClick={this.onBtnStartClick}>Start Game</button>
            </div>
            <div className='right'>
                <div></div>
                <div className='right-bottom'>
                    <button onClick={this.onBtnMusicClick}>Music</button>
                    <button>Setting</button>
                </div>
            </div>
        </div>
    }
}

export default UIStart