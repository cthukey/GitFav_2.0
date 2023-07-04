//class que vai conter a logica dos dados
//Como os dados serao estruturados
class favorites{
    constructor(root){
        this.root = document.querySelector('root')
    }
}





//class que vai criar a visualizacao e eventos do HTML
export class favoriteView extends favorites{
    constructor(root){
        super(root)

        this.update()
    }

    update(){
        this.removeAlltr()
    }

    removeAlltr(){
        const tbody = document.querySelector('table tbody')
        tbody.querySelectorAll('tr').
        forEach((tr)=>{
            tr.remove()
        })
    }
}