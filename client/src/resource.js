class Resource {
    constructor() {
        this.names= [
            'girl',
            'door',
            'milk',
            'mom',
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
                //console.log(`${name} loaded`)
                this.images[name] = img
                loadNum++
                if(loadNum === this.names.length)
                    callback()
            }
        })
    }

}

export default Resource