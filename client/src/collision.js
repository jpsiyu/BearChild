import tool from './tool'
import Eye from './eye'

class Collision{
    constructor(){
        this.child = undefined
        this.mom = undefined
    }

    updateObj(child, mom){
        this.child = child
        this.mom = mom
    }


    momCatchChild(callback) {
        const dis = tool.distance(this.child, this.mom)
        const res = dis < (this.mom.radius)
        if(res && callback) callback()
    }

    childCatchObj(handler){
        const all = window.g.map.allDraws()
        let objList, obj
        let targetObj, targetIndex
        for(let i = 0; i < all.length; i++){
            objList = all[i]
            for(let j = 0; j < objList.length; j++){
                obj = objList[j]
                const dis = tool.distance(this.child, obj)
                if(dis < 1){
                    targetObj = obj
                    targetIndex = j
                    break
                }
            }
        }
        if(targetObj) handler(targetObj, targetIndex)
    }

    handleCollision(obj, index){

    }
}

export default Collision