import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ResMgr from './resMgr'
import Music from './music'
import Map from './map'
import macro from './macro'
import pjson from '../../package.json'


const resReducer = (state = new ResMgr(), action) => {
    return state
}

const musicReducer = (state = new Music(), action) => {
    return state
}

const gameStateReducer = (state = macro.StateReady, action) => {
    switch (action.type) {
        case macro.ActionStateChange:
            return action.payload
        default:
            return state
    }
}

const mapReducer = (state = new Map(), action) => {
    return state
}

const contextReducer = (state = {}, action) => {
    switch (action.type) {
        case macro.ActionSetContext:
            return action.payload
        default:
            return state
    }
}

const appReducer = combineReducers({
    resMgr: resReducer,
    gameState: gameStateReducer,
    map: mapReducer,
    music: musicReducer,
    context: contextReducer,
})


const build = () => {
    if (pjson.production)
        return createStore(appReducer)
    else
        return createStore(appReducer, composeWithDevTools())
}

let store = undefined
const getStore = () => {
    if (!store) store = new build()
    return store
}

const changeState = (newState) => {
    const store = getStore()
    store.dispatch({ type: macro.ActionStateChange, payload: newState })
}

const setContext = (context) => {
    const store = getStore()
    store.dispatch({ type: macro.ActionSetContext, payload: context })
}

const storeState = () => {
    const store = getStore()
    return store.getState()
}

export {
    storeState,
    changeState,
    setContext,
}
