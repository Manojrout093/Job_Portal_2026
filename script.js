const jobContainer = document.getElementById("jobContainer");
const postForm = document.getElementById("postJobForm");
const searchForm = document.getElementById("searchForm");

let jobs = [];
let idCounter = 1;


function displayJobs(jobList) {
    jobContainer.innerHTML = "";

    if (jobList.length === 0) {
        jobContainer.innerHTML = "<p>No jobs posted yet</p>";
        return;
    }

    jobList.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Experience:</strong> ${job.experience}</p>

            <button onclick="updateJob(${job.id})">Update</button>
            <button onclick="deleteJob(${job.id})">Delete</button>
        `;

        jobContainer.appendChild(card);
    });
}


postForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const newJob = {
        id: idCounter++,
        title: document.getElementById("jobTitle").value,
        company: document.getElementById("jobCompany").value,
        location: document.getElementById("jobLocation").value,
        experience: document.getElementById("jobExperience").value
    };

    jobs.push(newJob);

    displayJobs(jobs);

    postForm.reset();
});


function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    displayJobs(jobs);
}


function updateJob(id) {
    const job = jobs.find(j => j.id === id);

    const title = prompt("Edit title", job.title);
    const company = prompt("Edit company", job.company);
    const location = prompt("Edit location", job.location);
    const exp = prompt("Edit experience", job.experience);

    if (title && company && location && exp) {
        job.title = title;
        job.company = company;
        job.location = location;
        job.experience = exp;
    }

    displayJobs(jobs);
}

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("searchTitle").value.toLowerCase();
    const location = document.getElementById("searchLocation").value.toLowerCase();
    const company = document.getElementById("searchCompany").value.toLowerCase();
    const exp = document.getElementById("searchExperience").value;

    const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(title) &&
        job.location.toLowerCase().includes(location) &&
        job.company.toLowerCase().includes(company) &&
        (exp === "" || job.experience === exp)
    );

    displayJobs(filtered);
});