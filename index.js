//alert user when submit btn clicked
function submitSuccess() {
    alert("Submitted Successfully");
    
}
//alert user when update btn clicked
function updateSuccess() {
    alert("Updated Successfully");
}

function openTab(evt, tabName) {
    //fetch all elements with class tab-content and hide
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
  
    //fetch all elements with class tab-btn and remove class active
    let tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
      tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }
  
    //show current tab, and add an active class btn that opened tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  //default tab
  document.getElementById("section1").style.display = "block";
  
