import UILoading from './uiLoading'
import UIStart from './uiStart'
import UIEnd from './uiEnd'
import macro from '../macro'
import React from 'react'

const uiConfig = {}
uiConfig[macro.UILoading] = {cls: UILoading, full:true}
uiConfig[macro.UIStart] = {cls: UIStart, full:true}
uiConfig[macro.UIEnd] = {cls: UIEnd, full:false}


class UIMgr{
    constructor(){
        this.showing = {}
    }

    getComponent(){
        const uiInfo = this.getUIInfo()
        return uiInfo ?  uiInfo.component: null
    }

    getUIInfo(){
        const firstPageName = Object.keys(this.showing)[0]
        const uiInfo = this.showing[firstPageName]
        return uiInfo
    }

    isShowing(){
        const res = Object.keys(this.showing).length != 0
        return res
    }

    isPopUI(){
        const uiInfo = this.getUIInfo()
        const res = uiInfo ? !uiInfo.cfg.full: false
        return res
    }

    show(uiName){
        const cfg = uiConfig[uiName]
        if(!cfg) return
        this.showing[uiName] = {
            component: <cfg.cls />,
            cfg: cfg
        }
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