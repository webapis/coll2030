
var selectedHomeTab = localStorage.getItem('home-tab')
var element =document.getElementById('#bread-crumb-container') 

document.getElementById('navbar').insertAdjacentHTML('beforeend', '<div class="container-md"><ul class="nav nav-tabs justify-content-center mx-0 px-0 my-2">' +
  '<li class="nav-item">' +
  '<a class="nav-link mtb" aria-current="page" href="/markalar.html" id="marka-tab">Marka</a>' +
  '</li>' +
  '<li class="nav-item">' +
  '<a class="nav-link mtb" href="/urunler.html"  id="urun-tab">Ürün</a>' +
  '</li>' +


  '<li class="nav-item">' +
  '<a class="nav-link mtb" href="/urunler.html"  id="favorite-tab"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg></a>' +
  '</li>' +
  '<li class="nav-item">' +
  '<a class="nav-link mtb" href="/urunler.html"  id="tl-tab">₺</a>' +
  '</li>' +
  '</ul></div>')

  document.body.querySelectorAll('.nav-link').forEach(function (element) {
  var id = element.id
  if (selectedHomeTab === id) {
    element.classList.add('active')
  }
})

document.body.querySelectorAll('.nav-link.mtb').forEach(function (element) {
  element.addEventListener('click', function (e) {

    localStorage.setItem('home-tab', e.target.id)
    localStorage.removeItem('selected-marka')
    localStorage.removeItem('selected-subcategory')
    window.location.replace(e.target.href)
  })

})

//