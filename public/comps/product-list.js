

   document.getElementById('content').insertAdjacentHTML('beforeend',  '<div class="container g-1"><div id="products" class="row g-1"></div></div>')
  var selectedSubcategory =  localStorage.getItem('selected-subcategory')
  if (selectedSubcategory !== null) {
   
    localStorage.setItem('startAt', 0)
    window.totalViewedData=0
    fetchData(0)

  }


    window.reachedBottom = false
  
    var element = document.getElementById('products')

    window.addEventListener('scroll', function scroll() {

      if ((window.innerHeight + window.scrollY) + 2000 >= document.body.offsetHeight && window.reachedBottom === false) {

    
        window.reachedBottom = true
        var totalSelectedSubcategory = parseInt( localStorage.getItem('total-selected-subcategory'))
        var totalViewedData =window.totalViewedData
        
        if(totalSelectedSubcategory >totalViewedData ){
        
          element.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-center" id="scroller"> <div class="spinner-border text-primary"  role="status" ><span class="visually-hidden">Loading...</span></div></div>')
          
          fetchNextPage()
        }else{
          element.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-center mb-4">Sayfa sonu. Toplam'+totalViewedData+' ürün görüntilendi</div>')
        }
       
        console.log('reached bottom of the page')
        // you're at the bottom of the page
      }

    })



  
  





function fetchData(start) {

  var selectedSubcategory = localStorage.getItem('selected-subcategory')
  var selectedMarka = localStorage.getItem('selected-marka')

  var url = '/api/kadin/data?start=' + start + '&subcategory=' + selectedSubcategory + '&marka=' + selectedMarka
  return fetch(url, { cache: 'default' }).then(function (response) { return response.json() }).then(function (data) {

    return data
  })
    .then(function (data) {
      var collection = data.data
      window.totalViewedData = window.totalViewedData + collection.length
      collection.forEach(function (props) {
        var element = document.getElementById('products')
        if (document.getElementById('scroller')) {
          element.removeChild(document.getElementById('scroller'))
        }

        var imagePlaceholder = placeholders[props.marka].placeholder

        var logo = placeholders[props.marka].logo

        var imageSource = placeholders[props.marka].imagePrefix.trim() + placeholders[props.marka].imageHost.trim() + props.imageUrl + placeholders[props.marka].imgPostFix
        var detailHost = placeholders[props.marka].detailHost + props.link + placeholders[props.marka].postfix

        element.insertAdjacentHTML('beforeend', '<div class="col-6 col-sm-4 col-md-3  mb-1"><div class="card" s>' +
          '<a href="' + detailHost + '"   target="_blank">' +
          '<img src="' + imageSource + '" class="card-img-top" alt="' + props.title + '">' +
          '</a>' +
          '<div class="m-0 p-0">' +
          '<div class="m-1">' +
          '<img src="' + logo.image + '" class="" alt="' + props.title + '" style="max-width:40%;">' +
          '<span class="m-1 fw-light text-end">' + props.priceNew + 'TL</span>' +
          '</div>' +

          '<a class="m-1 p-0 nav-link text-secondary"   href="' + detailHost + '"  target="_blank" style="font-size: 0.8em">' + props.title + '</a>' +
          '</div>' +
          '</div></div>')

      })
      window.reachedBottom = false
      console.log(data)
    })
    .catch(function (err) {
      console.log('err', err)
      return err
    })

}
function fetchNextPage() {

  let startAt = parseInt(localStorage.getItem('startAt'))

  let nextStartAt = startAt + 100
  localStorage.setItem('startAt', nextStartAt)
  fetchData(nextStartAt)
}
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