customElements.define('home-tabs', class extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback(){
        this.innerHTML=`<div class="container"><ul class="nav nav-tabs justify-content-center m-2">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Markalar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Ürünler</a>
        </li>
     
      </ul></div>`
    }
})