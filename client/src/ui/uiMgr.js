import UILoading from './uiLoading'
import macro from '../macro'
import React from 'react'

const uiConfig = {}
uiConfig[macro.UILoading] = {cls: UILoading}


class UIMgr{
    constructor(){
        this.showing = {}
    }

    getUI(){
        if(this.isShowing())
            return this.showing[Object.keys(this.showing)[0]]
        else
            return null
    }

    isShowing(){
        const res = Object.keys(this.showing).length != 0
        return res
    }

    show(uiName){
        const cfg = uiConfig[uiName]
        if(!cfg) return
        this.showing[uiName] = <cfg.cls />
        window.g.gameEventListener.dispatch(macro.UIRefresh)
    }

    hide(uiName){
        const ui = this.showing[uiName]
        if(!ui) return
        delete this.showing[uiName]
        window.g.gameEventListener.dispatch(macro.UIRefresh)
    }
}

export default UIMgr