//Hamburger Navigation Funtions
function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("hamburgerButton1").style.visibility='hidden';
  }
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("hamburgerButton1").style.visibility='visible';
  }
  //
  var overlayPage = document.getElementById('hamburgerButton1');
  function showDiv() {
    overlayPage.style.display = "block";
  }
  
  function closeDiv() {
    overlayPage.style.display = "none";
  }
  function showOrHide() {
    if (overlayPage.style.display === "block") {
      closeDiv()
    } else {
      showDiv()
    }
  }