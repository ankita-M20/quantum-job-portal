const CardTemplate = () => {
    fetch("./portal.json")
      .then((res) => res.json())
      .then((jobDetails) => {
        let contentCard = document.getElementById("main");
        console.log(jobDetails);
  
        const courseTemplate = jobDetails.map((jd, key) => {
          return `
          <div class="cards">
          ${jd.expiry ? `<div class="expired-label">
              <p>Expires in ${jd.expiry}</p>
          </div>` : ' '}
          <div class="cards-sub">
              <div class="card-head">
                  <div class="walk-in-title">${jd.walkINtitle}</div>
                  <div class="walk-in-details">
                      <p>Date & Time: </p>
                      <div class="walk-in-details-sub">
                          <div class="walk-in-date">${jd.dateStart} to ${jd.dateEnd}</div>
                          <div class="walk-in-location">
                              <img src="./assets/walk-in-asserts/location_on_black_24dp.svg" alt="location" class="location-icon" style="fill: #666666;"/>
                              <p>${jd.location}</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-tail">
                  <div class="job-opportnity">
                     <div class="job-roles"><p>Job Roles:</p></div>
                      <div class="avail-roles">
                          ${jd.jobRoles.instructionalDesigner ? `<div class="inst-designer"  id="job-icon">
                              <div class="job-icons"><img src="./assets/walk-in-asserts/Instructional Designer.svg" alt="inst-designer-logo" class="job-logos"/></div>
                              Instructional Designer
                          </div>` : " "}
                          ${jd.jobRoles.softwareEngineer ? `<div class="soft-eng"  id="job-icon">
                          <div class="job-icons"><img src="./assets/walk-in-asserts/Software Quality Engineer.svg" alt="soft-eng-logo" class="job-logos"/></div>
                              Software Engineer
                          </div>` : ' '}
                          ${jd.jobRoles.softwareQualityEngineer ? `<div class="qa-eng"  id="job-icon">
                          <div class="job-icons"><img src="./assets/walk-in-asserts/Software Quality Engineer.svg" alt="qa-eng-logo" class="job-logos"/></div>
                              Software Quality Engineer
                          </div>` : ' '}
                      </div>
                  </div>
                  ${jd.internship ? `<div class="intern-opportunity">Internship Opportunity for ${jd.internship} Students</div>` : ' '}
                  <div class="view-more">
                  <button class="view-more-btn" onclick="redirectToDetailsPage('${jd.walkINtitle}', '${jd.dateStart}', '${jd.dateEnd}', '${jd.location}')">View More Details</button>
                  </div>
              </div>
          </div>
      </div>`;
        });
  
        courseTemplate.map((template) => {
          return (contentCard.innerHTML += template);
        });
      })
      .catch((err) => {
        console.log("JSON Error:", err);
      });
  };

    // Function to redirect to walk-in-details page with selected details
    function redirectToDetailsPage(walkINtitle, startDate, endDate, location) {
        window.location.href = `./walk-in-details/index.html?walkINtitle=${encodeURIComponent(walkINtitle)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&location=${encodeURIComponent(location)}`;
    }
    

  window.onload = () => {
    CardTemplate();
   
  }