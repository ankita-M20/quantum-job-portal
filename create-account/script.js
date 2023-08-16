/*Anchor tag-----------------------------------------------------*/
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");
const prevButton = document.getElementById("prevFooterBtn");
const nextButton = document.getElementById("nextFooterBtn");
const createButton = document.getElementById("createBtn");
const roundIcons = document.querySelectorAll(".round-icon");

let currentSectionIndex = 0;
let totalSections = sections.length;

// Initially show only the 'personalSection'
sections.forEach((section) => {
  section.style.display = "none";
});
document.getElementById("personalSection").style.display = "block";
navLinks[currentSectionIndex].classList.add("active");
prevButton.style.display = "none"; // Hide 'Prev' button for the first section

// Handle 'Next' button click

function nextSection() {
  if (currentSectionIndex < totalSections) {
    if (currentSectionIndex === 0) {
      submitPersonalDetailsForm(); // Store Personal Details input
    } else if (currentSectionIndex === 1) {
      storeQualificationDetails(); // Store Qualification Details input
    }

    if (currentSectionIndex === totalSections - 2) {
      populateReviewSection(); // Populate review section with stored details
    }

    if (currentSectionIndex < totalSections - 1) {
      console.log("ffifthirst");
      navigateTo(currentSectionIndex + 1);
    }
  }
  console.log(currentSectionIndex, totalSections);
}

// Handle 'Prev' button click
function prevSection() {
  if (currentSectionIndex > 0) {
    navigateTo(currentSectionIndex - 1);
  }
}

// Update pencil icons based on active section
function updatePencilIcons(activeIndex) {
  const pencilIcons = document.querySelectorAll(".pencil-icon");
  pencilIcons.forEach((pencilIcon, index) => {
    if (index < activeIndex) {
      pencilIcon.innerHTML = '<img src="./assets/extra-assert/pencil.png">';
    } else {
      pencilIcon.textContent = index + 1;
    }
  });
}

// Navigate to the specified section index
function navigateTo(targetSectionIndex) {
  sections[currentSectionIndex].style.display = "none";
  sections[targetSectionIndex].style.display = "block";

  // Update round icon colors
  roundIcons.forEach((roundIcon, index) => {
    if (index <= targetSectionIndex) {
      roundIcon.classList.add("active-icon");
    } else {
      roundIcon.classList.remove("active-icon");
    }
  });

  if (targetSectionIndex === 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
  }

  if (targetSectionIndex === totalSections - 1) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }

  currentSectionIndex = targetSectionIndex;

  // Update pencil icons
  updatePencilIcons(targetSectionIndex);

  // Disable the 'Create' button by default
  createButton.setAttribute("disabled", "true");

  // Enable the 'Create' button when the 'Review' section is active
  if (currentSectionIndex === totalSections - 1) {
    createButton.removeAttribute("disabled");
  }
}

// Initially show only the 'personalSection'
sections.forEach((section, index) => {
  section.style.display = index === 0 ? "block" : "none";
});
updatePencilIcons(0); // Initialize pencil icons

/*----------------------Uploading Resume----------------------------------------------*/
function displayFileName() {
  const fileInput = document.getElementById("resume");
  const selectedFileName = fileInput.files[0].name;
  const selectedFileNameElement = document.getElementById("selected-file-name");

  selectedFileNameElement.textContent = selectedFileName;
}
/*-----------------------------Profile Upload-------------------------------------------*/
function openFileInput() {
  const fileInput = document.getElementById("profile-image");
  fileInput.click();
}

function replaceProfileImage(event) {
  const displayImage = document.getElementById("display-image");
  const selectedImage = event.target.files[0];
  const uploadLabel = document.querySelector(".upload-profile-picture");

  if (selectedImage) {
    const imageUrl = URL.createObjectURL(selectedImage);
    displayImage.src = imageUrl;
    uploadLabel.classList.add("uploaded");
  }
}

/*Save responses from personal details*/

// Define a global object to store the responses locally
const responses = {};

/*--------------------------------Qualifications---------------------------*/
function setupAccordion() {
  var acc = document.querySelectorAll(".accordion"); // Use querySelectorAll to select all elements with class "accordion"
  // var panels = document.querySelectorAll(".panel");

  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      var panel = this.nextElementSibling;

      // Toggle the active class and panel height
      this.classList.toggle("active");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

// Call the setupAccordion function when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupAccordion();
});

//add year options for date

// Get the select element by its ID
var statesSelect = document.getElementById("years");

// Get the current year
var currentYear = new Date().getFullYear();

// Loop through the years and create options
for (var year = currentYear; year >= 1970; year--) {
  var option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  statesSelect.appendChild(option);
}

//swith between fresher and experienced
document.addEventListener("DOMContentLoaded", function () {
  var radioExp = document.getElementById("radio-exp");
  var fresherRadio = document.getElementById("fresher");
  var experiencedRadio = document.getElementById("experience");
  var fresherCards = document.getElementById("radio-cards-fresher");
  var experiencedCards = document.getElementById("radio-cards-experienced");

  // Function to show/hide the appropriate section based on radio selection
  function updateRadioCards() {
    if (fresherRadio.checked) {
      fresherCards.style.display = "block";
      experiencedCards.style.display = "none";
    } else if (experiencedRadio.checked) {
      fresherCards.style.display = "none";
      experiencedCards.style.display = "block";
    }
  }

  // Add event listeners to radio buttons
  radioExp.addEventListener("change", updateRadioCards);

  // Initial update
  updateRadioCards();
});

//date
// Function to format date as "dd-Month-yyyy"
const noticeEndDateInput = document.getElementById("notice-end-date");

// Attach flatpickr date picker to the input field
flatpickr(noticeEndDateInput, {
  dateFormat: "d-M-Y", // Format: 20-May-2020
  disableMobile: true, // Prevent the browser's default date picker on mobile
});

//personal Section store details
let personalDetails = {};
// Variables to store user input from Personal Details section
let firstName = "";
let lastName = "";
let email = "";
let countryCode = "";
let phoneNumber = "";
let resumeFile = null;
let portfolioURL = "";
let preferredRoles = [];
let referralName = "";
let jobUpdateCheckbox = false;
let profilePictureFile = null;

// Function to update Personal Details Review
function updatePersonalDetailsReview() {
  // Update review based on user input
  document.getElementById("review-firstName").textContent = firstName;
  document.getElementById("review-lastName").textContent = lastName;
  document.getElementById("review-email").textContent = email;
  document.getElementById(
    "review-phoneNumber"
  ).textContent = `+${countryCode} ${phoneNumber}`;
  document.getElementById("review-portfolioURL").textContent = portfolioURL;
  document.getElementById("review-preferredRoles").textContent =
    preferredRoles.join(", ");
  document.getElementById("review-referralName").textContent = referralName;
  document.getElementById("review-jobUpdateCheckbox").textContent =
    jobUpdateCheckbox ? "Yes" : "No";
}

// Function to handle form submission
function submitPersonalDetailsForm() {
  // Update variables with user input
  console.log("hi");
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;
  email = document.getElementById("email").value;
  countryCode = document.getElementById("country-code").value;
  phoneNumber = document.getElementById("phone-number").value;
  resumeFile = document.getElementById("resume").files[0];
  portfolioURL = document.getElementById("portfolio").value;
  preferredRoles = [];
  const roleCheckboxes = document.querySelectorAll(
    'input[name="role"]:checked'
  );
  roleCheckboxes.forEach((checkbox) => {
    preferredRoles.push(checkbox.value);
  });
  referralName = document.getElementById("refferal").value;
  jobUpdateCheckbox = document.getElementById("check").checked;
  profilePictureFile = document.getElementById("profile-image").files[0];

  personalDetails = {
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    resumeFile,
    portfolioURL,
    preferredRoles,
    roleCheckboxes,
    referralName,
    jobUpdateCheckbox,
    profilePictureFile,
  };

  console.table(personalDetails);
  // Update Review Section
  // updatePersonalDetailsReview();
}

// Call submitPersonalDetailsForm() when the form is submitted
document
  .querySelector("#personalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    submitPersonalDetailsForm(); // Update Review Section
  });

//Qualification section
// Function to store user input from the Qualification Section

let QualificationDetails = {};
function storeQualificationDetails() {
  // Store educational qualification details
  const aggregatePercentage = document.getElementById("percentage").value;
  const yearOfPassing = document.getElementById("years").value;
  const qualification = document.getElementById("qualify").value;
  const stream = document.getElementById("stream").value;
  const college = document.getElementById("college").value;
  const otherCollege = document.getElementById("college-other").value;
  const collegeLocation = document.getElementById("college-location").value;

  // Store professional qualification details
  const applicantType = document.querySelector(
    "input[name='experience']:checked"
  ).value;

  let professionalDetails = {};
  let familiarTechnologies,
    familiarOtherTechnologies,
    yearsOfExperience,
    currentCTC,
    expectedCTC,
    expertiseTechnologies,
    expertiseOtherTechnologies,
    onNoticePeriod,
    noticePeriodEndDate,
    noticePeriodDuration,
    appearedForZeusTest,
    appliedRole;
  if (applicantType === "fresher") {
    // Store fresher details
    familiarTechnologies = getSelectedCheckboxValues("tech");
    familiarOtherTechnologies = document.getElementById("fresher-other").value;
    appearedForZeusTest = document.querySelector(
      "input[name='appeared-test']:checked"
    ).value;
    appliedRole = document.getElementById("applied-role").value;
  } else {
    // Store experienced details
    yearsOfExperience = document.getElementById("experience-years").value;
    currentCTC = document.getElementById("current-ctc").value;
    expectedCTC = document.getElementById("expected-ctc").value;
    expertiseTechnologies = getSelectedCheckboxValues("e-tech");
    expertiseOtherTechnologies = document.getElementById(
      "expertise-other-tech"
    ).value;
    familiarTechnologies = getSelectedCheckboxValues("f-tech");
    familiarOtherTechnologies = document.getElementById(
      "familiar-other-tech"
    ).value;
    onNoticePeriod = document.querySelector(
      "input[name='notice-period']:checked"
    ).value;
    noticePeriodEndDate = document.getElementById("notice-end-date").value;
    noticePeriodDuration = document.getElementById(
      "notice-period-duration"
    ).value;
    appearedForZeusTest = document.querySelector(
      "input[name='appeared-test']:checked"
    ).value;
    appliedRole = document.getElementById("applied-role").value;
  }

  // You can now store the `qualificationDetails` and `professionalDetails` objects as needed.
  QualificationDetails = {
    aggregatePercentage,
    yearOfPassing,
    qualification,
    stream,
    college,
    otherCollege,
    collegeLocation,
    applicantType,
    familiarTechnologies, //ye dono mein common hai bt isnt working for exp
    familiarOtherTechnologies,
    yearsOfExperience,
    currentCTC,
    expectedCTC,
    expertiseTechnologies,
    expertiseOtherTechnologies,
    onNoticePeriod,
    noticePeriodEndDate,
    noticePeriodDuration,
    appearedForZeusTest,
    appliedRole,
  };
  //   console.log(qualificationDetails);
  //  console.log(professionalDetails);
  console.table(QualificationDetails);
}

// Function to get selected checkbox values
function getSelectedCheckboxValues(checkboxName) {
  const checkboxes = document.querySelectorAll(
    `input[name='${checkboxName}']:checked`
  );
  const values = Array.from(checkboxes).map((checkbox) => checkbox.value);
  return values;
}

function populateReviewSection() {
  const rfirstname = document.getElementById("firstnamejs");
  rfirstname.innerHTML = personalDetails.firstName;
  const rlastname = document.getElementById("lastnamejs");
  rlastname.innerHTML = personalDetails.lastName;
  const remail = document.getElementById("emailjs");
  remail.innerHTML = personalDetails.email;
  const rcountrycode = document.getElementById("country-code-js");
  rcountrycode.innerHTML = personalDetails.countryCode;
  const rphone = document.getElementById("phonejs");
  rphone.innerHTML = personalDetails.phoneNumber;
  const rportfolio = document.getElementById("portfoliojs");
  rportfolio.innerHTML = personalDetails.portfolioURL || "-";
  const rfamiliarother = document.getElementById("familiar-other-tech-text");
  rfamiliarother.innerHTML =
    QualificationDetails.familiarOtherTechnologies || "-";
  const rexpother = document.getElementById("exp-other-tech-text");
  rexpother.innerHTML = QualificationDetails.expertiseOtherTechnologies || "-";
  const ryearsexp = document.getElementById("years-of-experience");
  ryearsexp.innerHTML = QualificationDetails.yearsOfExperience || "-";

  const raggpercent = document.getElementById("agg-percentage");
  raggpercent.innerHTML = QualificationDetails.aggregatePercentage;
  const ryearpassing = document.getElementById("year-of-passing");
  ryearpassing.innerHTML = QualificationDetails.yearOfPassing;
  const rqualification = document.getElementById("qualification-degree");
  rqualification.innerHTML = QualificationDetails.qualification;
  const rstream = document.getElementById("stream-degree");
  rstream.innerHTML = QualificationDetails.stream;
  const rcollege = document.getElementById("college-name");
  rcollege.innerHTML = QualificationDetails.college;
  const rothercollege = document.getElementById("other-college-name");
  rothercollege.innerHTML = QualificationDetails.otherCollege || "-";
  const rlocation = document.getElementById("location-of-college");
  rlocation.innerHTML = QualificationDetails.collegeLocation;
  const rnoticeperiodduration = document.getElementById(
    "notice-period-duration-month"
  );
  rnoticeperiodduration.innerHTML = QualificationDetails.noticePeriodDuration;
  const rservenotice = document.getElementById("serve-notice-period");
  rservenotice.innerHTML = QualificationDetails.onNoticePeriod;
  const rnoticeperioddate = document.getElementById("notice-period-date");
  rnoticeperioddate.innerHTML = QualificationDetails.noticePeriodEndDate;

  const rcurrctc = document.getElementById("curr-ctc");
  rcurrctc.innerHTML = QualificationDetails.currentCTC || "-";
  const rexpctc = document.getElementById("exp-ctc");
  rexpctc.innerHTML = QualificationDetails.expectedCTC || "-";
  const rappearedtest = document.getElementById("appeared-test-zeus");
  rappearedtest.innerHTML = QualificationDetails.appearedForZeusTest;
  const rempreffer = document.getElementById("role-applied");
  rempreffer.innerHTML = QualificationDetails.appliedRole || "-";
  const rrefferal = document.getElementById("refferaljs");
  rrefferal.innerHTML = personalDetails.referralName || "-";

  const jobUpdateReview = document.getElementById("jobUpdateReview");
  if (personalDetails.jobUpdateCheckbox) {
    jobUpdateReview.innerHTML = "Send me job related updates via mail y";
    document.getElementById("jobUpdateReview").checked = true; // Check the checkbox
  } else {
    jobUpdateReview.innerHTML = "Send me job related updates via mail n";
    document.getElementById("jobUpdateReview").checked = false; // Uncheck the checkbox
  }

  const rprofileimg = document.getElementById("display-image-js");
  const selectedPROFile = personalDetails.profilePictureFile;
  if (selectedPROFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      // Set the 'src' attribute of the image element to the uploaded image data URL
      rprofileimg.src = event.target.result;
    };

    // Read the uploaded image as a data URL
    reader.readAsDataURL(selectedPROFile);
  }
  console.log(rprofileimg, personalDetails);
  console.log(rfirstname, personalDetails);
  //displayFileName();
  const ruploadfile = document.getElementById("selected-file-name-js");
  const selectedUploadFiles = personalDetails.resumeFile;

  if (selectedUploadFiles) {
    ruploadfile.textContent = selectedUploadFiles.name;
  }

  const rcheckboxresponse = document.getElementById("checkbox-results");
  personalDetails.preferredRoles.map((role) => {
    const listItem = document.createElement("div");
    listItem.textContent = role;
    rcheckboxresponse.appendChild(listItem);
  });

  const rfamiliartech = document.getElementById("familiar-tech-checkboxes");
  QualificationDetails.familiarTechnologies.map((framework) => {
    const listItem = document.createElement("div");
    listItem.textContent = framework;
    rfamiliartech.appendChild(listItem);
  });

  const rexptech = document.getElementById("exp-tech-checkboxes");
  QualificationDetails?.expertiseTechnologies?.map((framework) => {
    const listItem = document.createElement("div");
    listItem.textContent = framework;
    rexptech.appendChild(listItem);
  });

  const rapplicantradio = document.getElementById("applicant-type-response");
  rapplicantradio.innerHTML = QualificationDetails.applicantType;

  if (QualificationDetails.applicantType === "fresher") {
    const exponly = document.querySelectorAll(".experience-only");
    for (let i = 0; i < exponly.length; i++) {
      exponly[i].style.display = "none";
    }
  }
}
