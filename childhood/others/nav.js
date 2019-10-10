function navopen() {
    document.getElementById("sidehoe").style.width = "20%";
    document.getElementById("mainhoe").style.marginLeft = "20%";
    document.getElementById("clickme").style.opacity = "0";
  }
  
  function navclose() {
    document.getElementById("sidehoe").style.width = "0";
    document.getElementById("mainhoe").style.marginLeft = "0";
    document.getElementById("clickme").style.opacity = "1";
  }