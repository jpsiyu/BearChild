import ResMgr from './resMgr'
import Music from './music'
import GameAudio from './gameAudio'
import Map from './map'
import macro from './macro'
import GameEventListener from './gameEventListener'
import PageMgr from './pageMgr'

class Global {
    constructor() {
        this.gameState = macro.StateLoad
        this.gameLv = 1
        this.resMgr = new ResMgr()
        this.music = new Music()
        this.map = new Map()
        this.gameAudio = new GameAudio()
        this.context = undefined
        this.gameEventListener = new GameEventListener()
        this.pageMgr = new PageMgr()
    }

    init(){
        this.map.init()
    }
}

const g = new Global()
window.g = g

export default {g}