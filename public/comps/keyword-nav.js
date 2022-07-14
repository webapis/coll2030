var selectedSubcategory =localStorage.getItem('selected-subcategory')

if(selectedSubcategory){




var selectedMarka= localStorage.getItem('selected-marka')


document.getElementById('shell-nav').insertAdjacentHTML('beforeend', `
<ul id="myUL">
 
</ul>
`)





let keywordpath = ''
if (selectedMarka) {
  keywordpath = '/keywords/marka/' + selectedMarka + '.json'
} else {
  keywordpath = '/keywords/category/' + selectedSubcategory + '.json'
}

fetch(keywordpath).then(function (response) { return response.json() }).then(function (data) {


  var subcategories = ''
  if (selectedMarka) {
    subcategories = Object.entries(data[selectedSubcategory])
  } else {
    subcategories = Object.entries(data)
  }
  subcategories.sort(function (a, b) {

    var textA = a[0].toUpperCase();
    var textB = b[0].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }).forEach(function (subcategory, i) {
    const parentKeyword = subcategory[0]
    const totalParent = subcategory[1][parentKeyword]
    const keywords = Object.entries(subcategory[1])

    const matchWithPrevious = i > 0 && subcategories[i - 1][0].charAt(0) === subcategory[0].charAt(0)

    if (i === 0 || !matchWithPrevious) {
      document.getElementById('myUL').insertAdjacentHTML('beforeend',`
      <li id='alfabet-${parentKeyword.charAt(0)}'><span class="mx-4 rounded-1 badge rounded-pill text-bold bg-secondary">${parentKeyword.charAt(0).toUpperCase()}</span>
      <ul class="nested active">
      </ul>
    </li>
      `)


    }
    if(keywords.length>1){
      document.getElementById(`alfabet-${parentKeyword.charAt(0)}`).querySelector('ul').insertAdjacentHTML('beforeend',`
      <li id='parent-key-${i}'><span class="caret text-capitalize">${parentKeyword} ${selectedSubcategory}</span>
      <ul class="nested" id='ul-${i}'>
    </ul>
      </li>
      `)
      if(localStorage.getItem('selected-parent-keyword')===parentKeyword){

        document.getElementById(`parent-key-${i}`).querySelector('.nested').classList.toggle("active")
        document.getElementById(`parent-key-${i}`).querySelector('span').classList.toggle("caret-down");
 
      }
      document.getElementById(`parent-key-${i}`).addEventListener('click',function(){
        debugger
        document.getElementById(`parent-key-${i}`).querySelector('.nested').classList.toggle("active")
        document.getElementById(`parent-key-${i}`).querySelector('span').classList.toggle("caret-down");
        localStorage.setItem('selected-parent-keyword', parentKeyword)
      })
    

    } else{
      document.getElementById(`alfabet-${parentKeyword.charAt(0)}`).querySelector('ul').insertAdjacentHTML('beforeend',`
      <li id='parent-key-${i}' class='px-3 text-capitalize'>${parentKeyword} ${selectedSubcategory}</li>
      `)

      document.getElementById(`parent-key-${i}`).addEventListener('click',function(){
        debugger
        localStorage.setItem('selected-keyword', parentKeyword)
        localStorage.setItem('selected-keyword-total', totalParent)

        localStorage.setItem('selected-parent-keyword', parentKeyword)
        window.location.reload()
      })

      if(localStorage.getItem('selected-parent-keyword')===parentKeyword){
       // document.getElementById(`parent-key-${i}`).querySelector('li').classList.add('bg-secondary')
      }
    }
  


var filterparentkayword =keywords.filter(function(k,i){

  return i>0})

filterparentkayword.forEach(function (kword,c) {

      const title = kword[0]
      const total = kword[1]

      document.getElementById(`parent-key-${i}`).querySelector('.nested')&&   document.getElementById(`parent-key-${i}`).querySelector('.nested').insertAdjacentHTML('beforeend',`
      <li class=" d-flex justify-content-between align-items-start" id='li-${c}' name='${title}'>
            <span class="text-capitalize" style="cursor: pointer;">
             
             ${title} 
            </span>
            <span class="badge bg-secondary rounded-pill">${total}</span>
          </li>
     `)

     if(localStorage.getItem('selected-keyword')===title){
      debugger
      document.querySelector(`[name="${title}"]`).classList.add('bg-secondary')
     document.querySelector(`[name="${title}"]`).parentElement.querySelector('.nested')&&  document.querySelector(`[name="${title}"]`).parentElement.querySelector('.nested').classList.toggle("active")

    }
     document.getElementById(`parent-key-${i}`).querySelector(`#li-${c}`)&&  document.getElementById(`parent-key-${i}`).querySelector(`#li-${c}`).addEventListener('click',function(e){
      var id =e.currentTarget.id
      var name =e.currentTarget.name
     debugger
      localStorage.setItem('selected-keyword', title)
      localStorage.setItem('selected-keyword-total', total)
      document.querySelector(`[name="${title}"]`).classList.add('bg-secondary')
      document.querySelector(`[name="${title}"]`).parentElement.querySelector('.nested')&&  document.querySelector(`[name="${title}"]`).parentElement.querySelector('.nested').classList.toggle("active")

         window.location.reload()
debugger
     })




    })

  })

})





}
