import React from 'react'
import macro from '../macro'

class UILoading extends React.Component {
    constructor() {
        super()
        this.time = 3
        this.pass = 0
        this.timer = undefined
        this.intever = 0.1
        this.state = {
            percent: 0
        }
        this.count = 0
        this.progressEnd = false
        this.loadFinish = false
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.count++
            if (this.pass < this.time) {
                this.pass += this.intever
            } else {
                this.progressEnd = true
            }
            let p = (this.pass / this.time)
            p = Math.min(p, 0.99)
            this.setState({ percent: p })
            if (this.progressEnd && this.loadFinish) {
                clearInterval(this.timer)
                window.g.uiMgr.hide(macro.UILoading)
                window.g.gameEventListener.dispatch(macro.EventLoadFinish)
            }
        }, this.intever * 1000)

        window.g.resMgr.loadRes(() => {
            this.loadFinish = true
        })
    }

    dots() {
        return '.'.repeat(this.count % 6)
    }

    render() {
        const wp = Math.floor(this.state.percent * 100)
        const wps = `${wp}%`

        return <div className='uiFull UILoading'>
            <div className='progressBorder'>
                <h3>{`Loading ${this.dots()}`}</h3>
                <div className='progressFill' style={{ width: wps }}></div>
                <p>{wps}</p>
            </div>
        </div>
    }
}

export default UILoading

