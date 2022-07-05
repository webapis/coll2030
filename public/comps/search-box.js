customElements.define('search-box', class extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = '<div class="container">'+
        '<div class="row">'+
        '<input class="col-6 form-control"/>'+
    
        '</div>'+
        '</div>'
    }
})