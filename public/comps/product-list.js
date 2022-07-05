


customElements.define('product-list', class extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    var selectedSubcategory = localStorage.getItem('selected-subcategory')
    if (selectedSubcategory !== null) {
      this.innerHTML = '<div class="container g-1"><div id="products" class="row g-1"></div></div>'
      this.fetchData(0).then(function (data) {
        var collection = data.data

        collection.forEach(function (props) {
          var element = document.getElementById('products')

          var imagePlaceholder = placeholders[props.marka].placeholder

          var logo = placeholders[props.marka].logo

          var imageSource = placeholders[props.marka].imagePrefix.trim() + placeholders[props.marka].imageHost.trim() + props.imageUrl + placeholders[props.marka].imgPostFix
          var detailHost = placeholders[props.marka].detailHost + props.link + placeholders[props.marka].postfix

          element.insertAdjacentHTML('beforeend', '<div class="col-6 col-sm-4 col-md-3  mb-1"><div class="card" s>'+
              '<a href="'+detailHost+'"   target="_blank">'+
              '<img src="'+imageSource+'" class="card-img-top" alt="'+props.title+'">'+
             '</a>'+
                '<div class="m-0 p-0">'+
                '<div class="m-1">'+
                '<img src="'+logo.image+'" class="" alt="'+props.title+'" style="max-width:40%;">'+
                '<span class="m-1 fw-light text-end">'+props.priceNew+'TL</span>'+
                '</div>'+
            
                '<a class="m-1 p-0 nav-link text-secondary"   href="'+detailHost+'"  target="_blank" style="font-size: 0.8em">'+props.title+'</a>'+
                '</div>'+
              '</div></div>')

        })
        console.log(data)
      })

    }

  }

  fetchData(start) {

    var selectedSubcategory = localStorage.getItem('selected-subcategory')
    var selectedMarka = localStorage.getItem('selected-marka')

    var url = '/api/kadin/data?start='+start+'&subcategory='+selectedSubcategory+'&marka='+selectedMarka
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
//

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