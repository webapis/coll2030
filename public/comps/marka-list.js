var placeholders = {
    defacto: { logo: { image: './logo/defacto.svg', width: '100px',height:'' }},
    koton: { logo: { image: './logo/koton.webp', width: '100px'}},
    boyner: { logo: { image: "./logo/boyner.svg", width: '100px'}},
    ipekyol: { logo: { image: './logo/ipekyol.svg', width: '30%'}},
    machka: { logo: { image: './logo/machka.svg', width: '30%',  }},
    lcwaikiki: { logo: { image: './logo/lcwaikiki.svg', width: '30%', height: '' }},
    mavi: { logo: { image: './logo/mavi.svg', width: '18%', height: 10 }}, 
    adl: { logo: { width: '15%', heigth: '', image: './logo/adl.jpg' }}, 
    penti: { logo: { image: './logo/penti.svg', width: '25%', height: '' }},
    roman: { logo: { image: './logo/roman.png', width: '25%', height: '' }},
    beymen: { logo: { image: './logo/beymen.svg', width: '45%', height: '' }},
    vakko: { logo: { image: './logo/vakko.jpg', width: '30%', height: '' }}, 
    zara: { logo: { image: './logo/zara.jpg', width: '15%', height: '' }},
    twist: { logo: { image: './logo/twist.svg', width: '15%', height: '' }},
    hm: { logo: { image: './logo/hm.jpg', width: '15%', height: '' }},
    adidas: { logo: { image: './logo/adidas.jpg', width: '28%', height: '' }},
    baqa: { logo: { image: './logo/baqa.png', width: '20%', height: '' }}, 
    beyyoglu: { logo: { image: './logo/beyyoglu.svg', width: '45%', height: '' }}, 
}


customElements.define('marka-list', class extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = '<div class="container"><div id="marka-list" class="row"></div></div>'
        fetch('./marka-nav.json').then(function (response) {
            return response.json()
        }).then(function (data) {


            const markas = Object.entries(data[0].nav.markas)
            markas.forEach(function (m, i) {
                const marka = m[0]
                const totalByCatory = m[1]['totalByCatory']
                const div = document.createElement('ul')
                div.href='#'
                div.className='col-4 mb-1'
                div.insertAdjacentHTML('afterbegin', `
                <li class="list-group-item-action list-group-item d-flex justify-content-between align-items-center">
                  <img src="${placeholders[marka].logo.image}" height="30" max-width="200"/>
                  <span class="badge bg-secondary rounded-pill">${totalByCatory}</span>
                </li>
                
              `)
            
                document.getElementById('marka-list').appendChild(div)
                debugger;
            })

        })

    }
})




/*

customElements.define('marka-list', class extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = '<div class="container"><div id="marka-list" class="row"></div></div>'
        fetch('./marka-nav.json').then(function (response) {
            return response.json()
        }).then(function (data) {


            const markas = Object.entries(data[0].nav.markas)
            markas.forEach(function (m, i) {
                const marka = m[0]
                const totalByCatory = m[1]['totalByCatory']
                const div = document.createElement('a')
                div.href='#'
                div.className='col-12 mb-1'
                div.insertAdjacentHTML('afterbegin', `<div class="card d-flex" style="width: 18rem;" style="position:relative">
                <img src="${placeholders[marka].logo.image}"  width="${placeholders[marka].logo.width}" class="m-1" style="position:absolute" >
                <div class="card-body">
                  <h5 class="card-title">
           
                  </h5>
           
                </div>
              </div>`)
            
                document.getElementById('marka-list').appendChild(div)
                debugger;
            })

        })

    }
})


*/