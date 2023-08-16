/*document.addEventListener('DOMContentLoaded', function() {
    var storedTimeSlot = sessionStorage.getItem('selectedTimeSlot');
    var walkInTimeElement = document.getElementById('walkInTime');

    if (storedTimeSlot) {
        walkInTimeElement.textContent = storedTimeSlot;
    } else {
        walkInTimeElement.textContent = 'Time Slot Not Available';
    }
    console.log("Time Slot : ", storedTimeSlot)
}); */

// Function to retrieve and populate values from sessionStorage
// Function to retrieve and populate values from sessionStorage
function populateConfirmationDetails() {
    const selectedTimeSlot = sessionStorage.getItem('selectedTimeSlot');
    const formattedStartDate = sessionStorage.getItem('formattedStartDate');

     var StartDate = convertDateFormat(formattedStartDate);

    const timeSlotElement = document.getElementById('timeSlot');
    const startDateElement = document.getElementById('startDate');

    console.log("Time Slot: ", selectedTimeSlot);
    console.log("Date : ", formattedStartDate, "=>", StartDate);

    if (selectedTimeSlot && StartDate) {
        timeSlotElement.textContent = selectedTimeSlot;
        startDateElement.innerHTML = StartDate; // Use innerHTML here
    }

        // Function to convert date format (e.g., "10-Jul-2021" to "3rd July 2021")
    function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${getDayWithOrdinal(day)} ${month} ${year}`;
    }

    // Function to add ordinal suffix to day (e.g., 1st, 2nd, 3rd)
    function getDayWithOrdinal(day) {
    if (day === 1 || day === 21 || day === 31) {
        return day + '<sup>st</sup>';
    } else if (day === 2 || day === 22) {
        return day + '<sup>nd</sup>';
    } else if (day === 3 || day === 23) {
        return day + '<sup>rd</sup>';
    } else {
        return day + '<sup>th</sup>';
    }
    }

}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateConfirmationDetails();
});
