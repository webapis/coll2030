customElements.define('bread-crumb', class extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const selectedPage =localStorage.getItem('page')
        this.innerHTML = `<div class="container"><nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Library</a></li>
          <li class="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav></div>`
     
        this.querySelectorAll('a').forEach(function (element) {
            element.addEventListener('click', function(e){
                e.preventDefault()
                var id = e.target.id
                var href =e.target.href
             
                console.log('clicked')
                localStorage.setItem('page', id)
                window.location=href
            })
        })
    }


})