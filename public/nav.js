var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";

   document.getElementById('static-nav').style.visibility="visible"

  } else {
   
  document.getElementById("navbar").style.top = "-320px";

 document.getElementById('static-nav').style.visibility="hidden"
  }
  prevScrollpos = currentScrollPos;
}


