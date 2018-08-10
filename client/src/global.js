import ResMgr from './resMgr'
import GameAudio from './gameAudio'
import Map from './map'
import macro from './macro'
import GameEventListener from './gameEventListener'
import PageMgr from './pageMgr'
import UIMgr from './ui/uiMgr'

class Global {
    constructor() {
        this.gameState = macro.StateLoad
        this.gameLv = 1
        this.resMgr = new ResMgr()
        this.map = new Map()
        this.gameAudio = new GameAudio()
        this.context = undefined
        this.gameEventListener = new GameEventListener()
        this.pageMgr = new PageMgr()
        this.uiMgr = new UIMgr()
    }

    init(){
        this.map.init()
    }
}

const g = new Global()
window.g = g

export default {g}