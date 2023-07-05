//class que vai conter a logica dos dados
//Como os dados serao estruturados
class favorites{
    constructor(root){
        this.root = document.querySelector('root')
        
        this.load()
    }

    load(){
        this.entries = [
            {
                login:'cthukey',
                name:'Pedro Henrique',
                public_repos:'76',
                followers:'120000',
            },

            {
                login:'diego3g',
                name:'Diego fernandes',
                public_repos:'78',
                followers:'120000',
            }
        ]
    }
}





//class que vai criar a visualizacao e eventos do HTML
export class favoriteView extends favorites{
    constructor(root){
        super(root)
        
        this.tbody = document.querySelector('table tbody')

        this.update()
    }

    update(){
        this.removeAlltr()

        this.entries.forEach(user => {
            const row = this.createRow()
            // console.log(row)
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user p').textContent = `${user.name}`
            row.querySelector('.user span').textContent = `${user.login}`
            row.querySelector('.repositories').textContent = `${user.public_repos}`
            row.querySelector('.followers').textContent = `${user.followers}`









            this.tbody.append(row)//(append)Ele vai receber a @row para q seja Html
        })
    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
        
        <td class="user">
            <img src="https://github.com/cthukey.png" alt="Image de perfil">
            <a href="https://github.com/cthukey" target="_blank">
                <p>Pedro Henrique</p>
                <span>/cthukey</span>
            </a>
            </td>
            <td class="repositories">
                123
            </td>
            <td class="followers">
                1234
            </td>
            <td>
                <button class="remove">Remover</button>
            </td>

        `

        return tr
    }

    removeAlltr(){
        this.tbody.querySelectorAll('tr').
        forEach((tr)=>{
            tr.remove()
        })
    }
}