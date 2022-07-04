


customElements.define('product-list', class extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const selectedSubcategory = localStorage.getItem('selected-subcategory')
    if (selectedSubcategory !== null) {
      this.innerHTML = `<div class="container">
      <div id="products" class="row">
      
      </div></div>`
      this.fetchData(0).then(function (data) {
        var collection = data.data
    
        collection.forEach(function (props) {
  var element = document.getElementById('products')
  
  const imagePlaceholder = placeholders[props.marka].placeholder
  debugger;
  const logo = placeholders[props.marka].logo
  debugger;
  const imageSource = placeholders[props.marka].imagePrefix.trim() + placeholders[props.marka].imageHost.trim() + props.imageUrl+placeholders[props.marka].imgPostFix
  const detailHost = placeholders[props.marka].detailHost + props.link+placeholders[props.marka].postfix
  debugger
  element.insertAdjacentHTML('beforeend', `<div class="col mb-1"><div class="card" style="width: 18rem;">
              <a href="${detailHost}"   target="_blank" >
                <img src="${imageSource}" class="card-img-top" alt="${props.title}">
             </a>
                <div class="card-body">
                <div class="d-flex justify-content-between">
                <img src="${logo.image}" class="" alt="${props.title}" width="${logo.width}">
                <span class="m-1">${props.priceNew} TL</span>
                </div>
                <a class="card-title fs-6  btn "   href="${detailHost}"  target="_blank" >${props.title}</a>
                </div>
              </div></div>`)
          debugger;
        })
        console.log(data)
      })

    }

  }

  fetchData(start) {

    const selectedSubcategory = localStorage.getItem('selected-subcategory')
    const selectedMarka = localStorage.getItem('selected-marka')

    const url = `/api/kadin/data?start=${start}&subcategory=${selectedSubcategory}&marka=${selectedMarka}`
    return fetch(url, { cache: 'default' }).then(function (response) { return response.json() }).then(function (data) {


      return data
    }).catch(function (err) {
      console.log('err', err)
      return err
    })




  }
})




/*
  async function fetchData(page) {


    const url = `/api/kadin/data?page=${page}&subcatregex=${selectedRegex}&marka=${selectedMarka}&categoryregex=${selectedCategory}&search=${search}`
    const response = await fetch(url, { cache: 'default' })

    const { data, count } = await response.json()

    dispatch(actions.setFetchedProductsTotal({ products: data, subCatTotal: count }))
    dispatch(actions.setFetchState(false))



  }

  function fetchNextPage() {
    dispatch(actions.setFetchState(true))
    let prevPage = parseInt(localStorage.getItem('page'))
    let nextPage = prevPage + 100
    localStorage.setItem('page', nextPage)
    fetchData(nextPage)
  }
*/