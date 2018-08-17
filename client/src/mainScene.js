import React from 'react'
import macro from './macro'
import Game from './game'
import global from './global'
import '../public/style.css'

class MainScene extends React.Component {
    constructor() {
        super()
        this.canvas = undefined
        this.ui = undefined
        this.state = {
            gl: 0,
            gt: 0,
        }
        this.game = undefined
    }

    componentDidMount() {
        this.div = this.refs.div
        this.divUI = this.refs.divUI
        this.canvas = this.refs.canvasGame
        this.canvas.focus()
        this.context = this.canvas.getContext('2d')

        this.div.addEventListener('touchstart', event => { event.preventDefault() })
        document.addEventListener('visibilitychange', () => {
            document.hidden ? window.g.gameAudio.pause('bg.mp3') : window.g.gameAudio.play('bg.mp3')
            this.game.setPause(document.hidden)
        })
        window.addEventListener('resize', ev => { this.resizeCanvas() })
        window.addEventListener('orientationchange', ev => { setTimeout(() => { this.resizeCanvas() }, 200); })
        this.startLoading()
    }



    startLoading() {
        window.g.context = this.context
        window.g.map.init(() => { this.resizeCanvas() })

        this.game = new Game(this.context)
        window.g.pageMgr.addListener()
        window.g.pageMgr.show('PageLoad')
        this.game.startLoad()
    }

    resizeCanvas() {
        const updateState = {}
        let gw, gh

        const curruntRatio = (window.innerWidth / window.innerHeight)
        if (curruntRatio > macro.WidthHeightRatio) {
            gh = window.innerHeight
            gw = gh * macro.WidthHeightRatio
        } else {
            gw = window.innerWidth
            gh = gw / macro.WidthHeightRatio
        }

        const size = window.g.map.calGridSize(gw, window.g.map.mapCfg.gridInRow)
        gh -= gh % size

        this.canvas.width = gw
        this.canvas.height = gh
        this.divUI.width = gw
        this.divUI.height = gh

        updateState.gl = (window.innerWidth - gw) / 2
        updateState.gt = (window.innerHeight - gh) / 2
        this.setState(updateState)

        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 200);
    }

    render() {
        return <div ref='div' className='divRoot' >
            <canvas ref='canvasGame' className='canvasGame'
                style={{ marginTop: this.state.gt, marginLeft: this.state.gl }}>
            </canvas>
            <div ref='divUI' className='divUI'
                style={{ marginTop: this.state.gt, marginLeft: this.state.gl }}>
                <button>HaHa</button>
            </div>
        </div>
    }
}

export default MainScene