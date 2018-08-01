import React from 'react'
import ReactDOM from 'react-dom'
import GameCpt from './gameCpt'

class Entry extends React.Component {
    render() {
        return <GameCpt />
    }
}

ReactDOM.render(<Entry />, document.getElementById('game'))