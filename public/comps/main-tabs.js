
var selectedHomeTab = localStorage.getItem('home-tab')
var element =document.getElementById('#bread-crumb-container') 
debugger;
document.getElementById('navbar').insertAdjacentHTML('beforeend', '<div class="container"><ul class="nav nav-tabs justify-content-center m-2">' +
  '<li class="nav-item">' +
  '<a class="nav-link mtb" aria-current="page" href="/markalar.html" id="marka-tab">Markalar</a>' +
  '</li>' +
  '<li class="nav-item">' +
  '<a class="nav-link mtb" href="/urunler.html"  id="urun-tab">Ürünler</a>' +
  '</li>' +
  '</ul></div>')

  document.querySelectorAll('.nav-link').forEach(function (element) {
  var id = element.id
  if (selectedHomeTab === id) {
    element.classList.add('active')
  }
})

document.querySelectorAll('.nav-link.mtb').forEach(function (element) {
  element.addEventListener('click', function (e) {

    localStorage.setItem('home-tab', e.target.id)
    localStorage.removeItem('selected-marka')
    localStorage.removeItem('selected-subcategory')
    window.location.replace(e.target.href)
  })

})

