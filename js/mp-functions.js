// Store API credentials from PHP
const apiKey = "<?php echo API_KEY; ?>"; // API key for authorization
const iolKey = "<?php echo IOL_KEY; ?>"; // Queue identifier
const userId = "<?php echo USER_ID; ?>"; // Username for authorization

function submitJob() {
  console.log("submitJob() fired");

  // Create headers for the API request
  var mpHeaders = new Headers();
  mpHeaders.append("Authorization", apiKey);
  mpHeaders.append("X-MotionCore-Queue", iolKey);
  mpHeaders.append("X-MotionCore-UserName", userId);

  // Prepare form data to send
  var formdata = new FormData();
  formdata.append("contentType", "application/json");
  formdata.append("contentCharset", "utf-8");
  formdata.append('file', mpFile.files[0]);

  // Define request 
  var requestOptions = {
      method: 'POST',
      headers: mpHeaders,
      body: formdata
      //redirect: 'follow'
  };

   // Make the fetch request to submit the job
  fetch("https://sandboxapi.motionpoint.com/translationjobs", requestOptions)
      .then(response => response.text())
      .then(result => document.getElementById("queueStatus").innerHTML = "Translation job in queue.");
      .catch(error => document.getElementById("queueStatus").innerHTML = "Error uploading file.");
}

// Function to set a new callback URL
function getCallbackURL() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          alert("Current Callback:" + this.responseText)
          // document.getElementById("cbURLStatus").innerHTML = this.responseText;
      }
  };
  xhttp.open("GET", "./php/getCallback.php", true);
  xhttp.send();
}

function setCallbackURL() {
  var mpHeaders = new Headers();
  ß
  mpHeaders.append("Authorization", apiKey);
  mpHeaders.append("X-MotionCore-Queue", iolKey);
  mpHeaders.append("X-MotionCore-UserName", userId);
  mpHeaders.append("Content-Type", "application/json");

  var newCallBackURL = document.getElementById("cbURL").value;
  console.log("new callback: " + newCallBackURL);
  var data = JSON.stringify({
      "active": "true",
      "callbackUrl": "" + newCallBackURL + ""
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
          console.log(this.responseText);
      }
  });

  xhr.open("POST", "https://sandboxapi.motionpoint.com/callbackurl");
  xhr.setRequestHeader("Authorization", apiKey);
  xhr.setRequestHeader("X-MotionCore-Queue", iolKey);
  xhr.setRequestHeader("X-MotionCore-UserName", userId);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}

// Display output content of a job
function viewContent(id) {
  document.getElementById("json-data").innerHTML = "fetching...";
  var mpjobID = id;
  var mpbase = "https://sandboxapi.motionpoint.com/translations/jobs/";
  var mpFetch = mpbase + mpjobID;
  var mpHeaders = new Headers();
  mpHeaders.append("Authorization", apiKey);
  mpHeaders.append("X-MotionCore-Queue", iolKey);
  mpHeaders.append("X-MotionCore-UserName", userId);
  mpHeaders.append("Content-Type", "application/json");
  var raw = "";
  var requestOptions = {
      method: 'POST',
      headers: mpHeaders,
      body: raw,
      redirect: 'follow'
  };

  // Fetch job details
  fetch(mpFetch, requestOptions)
      .then(response => response.text())
      .then(result => document.getElementById("json-data").innerHTML = result);
      // .then(result => document.getElementById("json-data").innerHTML = JSON.stringify(result, undefined, 2);
}

// Create and save a JSON file from job data
function createJSONFile(result, fileID) {
  var mpjobID = fileID;
  var data = result;
  var fileName = 'job' + mpjobID + '.json';
  // var fileToSave = new Blob([JSON.stringify(data)], {type: 'application/json'});
  var fileToSave = new Blob([data], {type: 'application/json'});
  // saveAs requires ./js/mp-createSaveFilefromResponse.js
  saveAs(fileToSave, fileName);
}

// Download content of a job
function downloadContent(id) {
  var mpjobID = id;
  var mpbase = "https://sandboxapi.motionpoint.com/translations/jobs/";
  var mpFetch = mpbase + mpjobID;
  console.log(mpFetch);
  var mpHeaders = new Headers();
  mpHeaders.append("Authorization", apiKey);
  mpHeaders.append("X-MotionCore-Queue", iolKey);
  mpHeaders.append("X-MotionCore-UserName", userId);
  mpHeaders.append("Content-Type", "application/json");
  var raw = "";
  var requestOptions = {
      method: 'POST',
      headers: mpHeaders,
      body: raw,
      redirect: 'follow'
  };

  // Fetch job content
  fetch(mpFetch, requestOptions)
      .then(response => response.text())
      .then(result => {
          createJSONFile(result, mpjobID);
      })
}

// Cancel Job FETCH need full account and crossorigin policy from response
function cancelJob(id) {
  var mpjobID = id;
  var mpBase = "https://sandboxapi.motionpoint.com/translationjobs/";
  var mpAction = "/cancel";
  var mpCancel = mpBase + mpjobID + mpAction;
  console.log("cancelJob() fired" + mpCancel);
  var mpHeaders = new Headers();
  mpHeaders.append("Authorization", apiKey);
  mpHeaders.append("X-MotionCore-Queue", iolKey);
  mpHeaders.append("X-MotionCore-UserName", userId);
  mpHeaders.append("Content-Type", "application/json");

  var formdata = new FormData();
  formdata.append("reason:", "Duplicate Job");

  var requestOptions = {
      method: 'POST',
      headers: mpHeaders,
      body: formdata,
      redirect: 'follow'
  };

  // Fetch cancel job request
  fetch(mpCancel, requestOptions)
      .then(response => response.text())
      .then(result => document.getElementById("queueStatus").innerHTML = "Cancelling Translation Job.");
}

// Event Listeners
const elementURLsubmit = document.querySelector('#cbSubmit');
const elementURLinput = document.querySelector('#cbURL');
elementURLinput.addEventListener('input', function() {
  elementURLsubmit.classList.remove("disabled");
});
elementURLsubmit.addEventListener('click', function() {
  setCallbackURL();
});
document.getElementById('cbSubmit').addEventListener("click", setCallbackURL);
document.getElementById('cbRequest').addEventListener("click", getCallbackURL);

document.getElementById('mpFile').addEventListener('change', function(e) {
  if (e.target.files[0]) {
      document.getElementById("queueStatus").innerHTML = "" + e.target.files[0].name + " ready to submit.";
  }
  var selectedFile = mpFile.files[0];
  console.log(selectedFile);
  var elementBtnSubmit = document.getElementById("jobSubmit");
  elementBtnSubmit.classList.remove("disabled");
})
// Event listener for job submission
document.getElementById('jobSubmit').addEventListener("click", submitJob);