function setupAccordion() {
    var acc = document.getElementsByClassName("accordion");
    var panels = document.querySelectorAll(".panel");
    var floatingButton = document.getElementById('floating-button');
  
    for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        var panel = this.nextElementSibling;
  
        // Close all panels except the one being toggled
        for (var j = 0; j < panels.length; j++) {
          if (panels[j] !== panel) {
            panels[j].style.maxHeight = null;
          }
        }
  
        // Toggle the active class and panel height
        this.classList.toggle("active");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          floatingButton.style.display = 'none'; // Hide the button
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          floatingButton.style.display = 'block'; // Show the button
        }
      });
    }
  
    // Add event listener to the floating button
    floatingButton.addEventListener('click', function() {
      // Find the active accordion and panel
      var activeAccordion = document.querySelector(".accordion.active");
      var activePanel = activeAccordion ? activeAccordion.nextElementSibling : null;
  
      // If an active accordion and panel are found, close them
      if (activeAccordion && activePanel) {
        activeAccordion.classList.remove("active");
        activePanel.style.maxHeight = null;
      }
  
      // Hide the floating button after clicking
      floatingButton.style.display = 'none';
    });
  }
  
  //location & time
// Function to retrieve and populate values from query parameters
function populateDetailsFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const walkINtitle = urlParams.get('walkINtitle');
  const startDate = urlParams.get('startDate');
  const endDate = urlParams.get('endDate');
  const location = urlParams.get('location');

  const walkInTitleElement = document.getElementById('walkInTitle');
  const walkInDateElement = document.getElementById('walkInDate');
  const walkInLocationElement = document.getElementById('walkInLocation');

  console.log("Walk-in Title :", walkINtitle);
  console.log("Start Date :", startDate);
  console.log("End Date :", endDate);
  console.log("Location :", location);

  if (walkINtitle && startDate && endDate && location) {
      walkInTitleElement.textContent = walkINtitle;
      walkInDateElement.textContent = `${startDate} to ${endDate}`;
      walkInLocationElement.textContent = location;
  }
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  populateDetailsFromQueryParams();
});


//Apply button
document.addEventListener('DOMContentLoaded', function() {
  var selectedTimeSlot = null; // Variable to store the selected time slot

  // Add event listener to radio buttons
  var radioButtons = document.querySelectorAll('.radio-btn input[type="radio"]');
  for (var i = 0; i < radioButtons.length; i++) {
      radioButtons[i].addEventListener('change', function() {
          selectedTimeSlot = this.value; // Store the selected value
      });
  }

  // Add event listener to the "Apply" button
// Add event listener to the "Apply" button
var applyButton = document.querySelector('.apply-btn button');
applyButton.addEventListener('click', function() {
    // Check if a time slot was selected
    if (selectedTimeSlot) {
        // Retrieve the walk-in date from the page
        var walkInDateElement = document.getElementById('walkInDate');
        var selectedWalkInDate = walkInDateElement.textContent;

        // Extract the start date from the walk-in date string (e.g., "10-Jul-2021 to 11-Jul-2021")
        var formattedStartDate = selectedWalkInDate.split(' to ')[0];

        // Convert the start date to the desired format (e.g., "10-Jul-2021" to "10th July 2021")
       // var formattedStartDate = convertDateFormat(startDate);

        // Store the selectedTimeSlot and formattedStartDate in sessionStorage
        sessionStorage.setItem('selectedTimeSlot', selectedTimeSlot);
        sessionStorage.setItem('formattedStartDate', formattedStartDate);

        // Redirect to another HTML page
        window.location.href = './confirmation-page/index.html';
    } else {
        alert('Please select a time slot before applying.');
    }
});




});


  window.onload = function() {
    setupAccordion(); // Call the setupAccordion function when the window loads
  };
  