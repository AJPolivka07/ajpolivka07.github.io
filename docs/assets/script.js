//define and initialize variables for pointers to form elements.
const form = document.getElementById("checkInForm"); //defines form variable as an element
const nameField = document.getElementById("attendeeName");
const teamField = document.getElementById("teamSelect");

//define and initialize variables for counting attendees.
let count = 0; //number of attendees checked in
const goal = 50; //goal number of attendees to check in
let percentage = 0; //percentage of goal reached

// an event listener on form that provides the majority of this page's functionality.
form.addEventListener("submit", function (e) {
  e.preventDefault(); //prevents default behaviour, specifically browser refresh
  
  var name; //name provided by form, a String
  var team; //team provied by form, {water, zero, power}
  var teamCount; //pointer to element that counts number of attendees checked in for each team, an HTMLElement
  var message; //message to be displayed, a String

  //internally update variables
  name = nameField.value;
  team = teamField.value; 
  count++;
  if (count < goal) { //caps the progress bar's length
    percentage = Math.round(count / goal * 100) + "%";
  }
    else {
      percentage = "100%";
  }

  //DEBUG
  console.log("Name: " + name);
  console.log("Team: " + team);
  console.log("Number of attendees checked in: " + count);
  console.log("Percentage of goal reached: " + percentage);

  //updates team attendance cards on the webpage
  teamCount = document.getElementById(team + "Count"); //fetches the pointer
  teamCount.textContent = parseInt(teamCount.textContent) + 1; //parses the text content, converts to int, adds 1, then updates the text content with the new value

  //updates the overall attendance count and progress bar on the webpage
  document.getElementById("attendeeCount").textContent = count; //updates the overall attendance count

  message = `Welcome ${name} for ${team}! You have checked in.`; //defines the message
  console.log(message);

  form.reset(); //resets form fields after submission
});