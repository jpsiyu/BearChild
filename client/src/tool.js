import macro from './macro'

const grid2coord = (row, col) => {
    const x = macro.GridSize / 2 + col * macro.GridSize
    const y = macro.GridSize / 2 + row * macro.GridSize
    return { x, y }
}

const maxRow = () => {
    return macro.Height / macro.GridSize - 1
}

const maxCol = () => {
    return macro.Width / macro.GridSize - 1
}

const distance = (obj1, obj2) => {
    const dis = Math.sqrt(
        Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2)
    )
    return dis
}

const distancePos = (pos1, pos2) => {
    const dis = Math.sqrt(
        Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2)
    )
    return dis
}

export default {
    grid2coord,
    maxRow,
    maxCol,
    distance,
    distancePos,
}