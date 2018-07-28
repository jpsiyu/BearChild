class ResMgr {
    constructor() {
        this.names= [
            'child',
            'door',
            'milk',
            'mom',
            'drink',
            'catched',
        ]
        this.images = {}
    }

    loadImgs(callback) {
        let loadNum = 0
        this.names.forEach(name => {
            const img = new Image()
            const path = `${name}.png`
            img.src = path
            img.onload = () => {
                this.images[name] = img
                loadNum++
                if(loadNum === this.names.length)
                    callback()
            }
        })
    }
}

export default ResMgr