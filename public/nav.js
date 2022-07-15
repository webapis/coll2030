var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    // document.getElementById("navbar").style.height="80vh"

  } else {
    document.getElementById("navbar").style.top = "-260px";


  }
  prevScrollpos = currentScrollPos;
}


