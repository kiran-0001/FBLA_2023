function submitSuccess() {
    alert("Submitted Successfully");
}
function updateSuccess() {
    alert("Updated Successfully");
}

function openTab(evt, tabName) {
    // Get all elements with class "tab-content" and hide them
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
  
    // Get all elements with class "tab-btn" and remove the class "active"
    let tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
      tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Open the default tab
  document.getElementById("section1").style.display = "block";
  
