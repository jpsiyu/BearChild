import ResMgr from './resource'
import macro from './macro'

class GameMgr {
    constructor(){
        this.res = new ResMgr()
        this.state = macro.StateGame
    }
}

const gameMgr = new GameMgr()

export default gameMgr