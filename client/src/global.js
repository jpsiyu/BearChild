import ResMgr from './resMgr'
import Music from './music'
import Map from './map'
import macro from './macro'
import GameEventListener from './gameEventListener'

class Global {
    constructor() {
        this.gameState = macro.StateLoad
        this.resMgr = new ResMgr()
        this.music = new Music()
        this.map = new Map()
        this.context = undefined
        this.gameEventListener = new GameEventListener()
    }
}

const g = new Global()
window.g = g

export default {g}