export class GithubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(data => ({
            login: data.login,
            name: data.name,
            public_repos: data.public_repos,
            followers: data.followers,
        })) 
    }
}

//class que vai conter a logica dos dados
//Como os dados serao estruturados
export class favorites{
    constructor(root){
        this.root = document.querySelector('root')
        
        this.load()
        
    } 

    load(){
        this.entries = JSON.parse(localStorage.getItem
        ('@github-favorites:')) || []

        // console.log(this.entries)
        
    }

    async add(username){
        try{
            const user = await GithubUser.search(username)

            if(user.login === undefined){
                throw new Error('Usuario nao encontrado!')
            }
        } catch(error){
            alert(error.message)
        }
        
    }

    delete(user){
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
        
        // console.log(filteredEntries)
    }
}





//class que vai criar a visualizacao e eventos do HTML
export class favoriteView extends favorites{
    constructor(root){
        super(root)
        
        this.tbody = document.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = document.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = document.querySelector('.search input')

            this.add(value)
        }
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

            row.querySelector('.remove').onclick = () =>{
               const isOk = confirm('Tem certeza que deseja deletar essa linha?')
            
                if(isOk){
                    this.delete(user)
                }
            }







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