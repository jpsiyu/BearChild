import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ResMgr from './resMgr'
import macro from './macro'
import pjson from '../../package.json'

const resReducer = (state = new ResMgr() , action) => {
    return state
}

const gameStateReducer = (state = macro.StateGame , action) => {
    switch (action.type) {
        case macro.ActionStateChange:
            return action.payload
        default:
            return state
    }
}

const appReducer = combineReducers({
    resMgr: resReducer,
    gameState: gameStateReducer,
})


const build = () => {
    if (pjson.production)
        return createStore(appReducer)
    else
        return createStore(appReducer, composeWithDevTools())
}

const store = build()

const getStore = () => {
    return store
}

const gameState = () => {
    const allState = store.getState()
    return allState.gameState
}

const changeState = (newState) => {
    store.dispatch({ type: macro.ActionStateChange, payload: newState })
}

const getResMgr = () => {
    const allState = store.getState()
    return allState.resMgr
}

const getImg = (name) => {
    const res = getResMgr()
    return res.getImg(name)
}

export default {
    getStore,
    gameState,
    changeState,
    getResMgr,
    getImg,
}
