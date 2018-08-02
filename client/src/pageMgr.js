import PageStart from './pageStart'
import PageEnd from './pageEnd'
import PageLoad from './pageLoad'

class PageMgr{
    constructor(){
        this.pages = {}
    }

    update(elapsed){
        Object.keys(this.pages).forEach( key => {
            const page = this.pages[key]
            if(page.active)
                page.update(elapsed)
        })
    }

    draw(context){
        Object.keys(this.pages).forEach( key => {
            const page = this.pages[key]
            if(page.active)
                page.draw(context)
        })
    }

    getPage(pageName){
        let p = this.pages[pageName]
        if(p) return p

        switch(pageName){
            case 'PageStart':
                p = new PageStart()
                break
            case 'PageEnd':
                p = new PageEnd()
                break
            case 'PageLoad':
                p = new PageLoad()
                break
        }
        this.pages[pageName] = p
        return p
    }

    show(pageName){
        const p = this.getPage(pageName)
        if(p) p.show()
    }

    hide(pageName){
        const p = this.getPage(pageName)
        if(p) p.hide()
    }
}

export default PageMgr