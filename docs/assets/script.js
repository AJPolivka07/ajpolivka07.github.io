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
  e.preventDefault(); //prevents default behaviour, specifically browser refresh upon form submission
  
  var name; //name provided by form, a String
  var team; //team provied by form, {water, zero, power}
  var teamCount; //pointer to element that counts number of attendees checked in for each team, an HTMLElement
  var greetingBanner; //pointer to element that displays a greeting message, an HTMLElement
  var message; //message to be displayed, a String
  var attendeeList; //pointer to element that contains the list of attendees for each team, an HTMLElement
  var newAttendee; //pointer to created element that contains the name of the attendee being checked in, an HTMLElement

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

  //updates team attendance cards on the webpage
  teamCount = document.getElementById(team + "Count"); //fetches the pointer
  teamCount.textContent = parseInt(teamCount.textContent) + 1; //parses the text content, converts to int, adds 1, then updates the text content with the new value

  //updates the overall attendance count and progress bar on the webpage
  document.getElementById("attendeeCount").textContent = count;
  document.getElementById("progressBar").style.width = percentage;

  greetingBanner = document.getElementById("greeting");
  message = document.getElementById(team + "Name").textContent; //fetches the team's name
  message = `Welcome ${name} from ${message}! Thank you for checking in.`;
  greetingBanner.style.display = "block";  //updates the message on the webpage
  greetingBanner.textContent = message;
  //console.log(message);
  message = "";

  //adds name to the list of attendees for the team
  attendeeList = document.getElementById(team + "Attendees");
  newAttendee = document.createElement("li");
  newAttendee.textContent = name;
  attendeeList.appendChild(newAttendee);

  //displays the celebration banner if the goal is reached
  if (count >= goal) {
    let waterCount;
    let zeroCount;
    let powerCount;
    
    waterCount = parseInt(document.getElementById("waterCount").textContent);
    zeroCount = parseInt(document.getElementById("zeroCount").textContent);
    powerCount = parseInt(document.getElementById("powerCount").textContent);

    //if two or more teams share the top count, the result is a tie.
    let maxCount = Math.max(waterCount, zeroCount, powerCount);
    let topCountTeams = [waterCount, zeroCount, powerCount].filter(function (countValue) {
      return countValue === maxCount;
    }).length;

    if (topCountTeams > 1) {
      console.log("There's a tie!");
      message = "a tie";
    }
    else if (waterCount === maxCount) {
      console.log("Winner: water at " + waterCount);
      message = document.getElementById("waterName").textContent; //fetches the team's name
    }
    else if (zeroCount === maxCount) {
      console.log("Winner: zero at " + zeroCount);
      message = document.getElementById("zeroName").textContent; //fetches the team's name
    }
    else {
      console.log("Winner: power at " + powerCount);
      message = document.getElementById("powerName").textContent; //fetches the team's name
    }
    document.getElementById("celebration").style.display = "block";
    document.getElementById("celebrationWinner").textContent = message;
  }

  //form.reset(); //resets form fields after submission
  
  //saves various values to session storage
  sessionStorage.setItem("count", count);
  sessionStorage.setItem("percentage", percentage);
  sessionStorage.setItem("waterCount", document.getElementById("waterCount").textContent);
  sessionStorage.setItem("zeroCount", document.getElementById("zeroCount").textContent);
  sessionStorage.setItem("powerCount", document.getElementById("powerCount").textContent);
  sessionStorage.setItem("waterAttendees", document.getElementById("waterAttendees").innerHTML);
  sessionStorage.setItem("zeroAttendees", document.getElementById("zeroAttendees").innerHTML);
  sessionStorage.setItem("powerAttendees", document.getElementById("powerAttendees").innerHTML);
  sessionStorage.setItem("goalReached", count >= goal);
});

// immediately inserts session values on page load
(function() {
  console.log("Page loaded - add functionality here");

  count = sessionStorage.getItem("count") || 0;
  percentage = sessionStorage.getItem("percentage") || 0;
  document.getElementById("attendeeCount").textContent = count;
  document.getElementById("progressBar").style.width = percentage;

  document.getElementById("waterCount").textContent = sessionStorage.getItem("waterCount") || 0;
  document.getElementById("zeroCount").textContent = sessionStorage.getItem("zeroCount") || 0;
  document.getElementById("powerCount").textContent = sessionStorage.getItem("powerCount") || 0;
  document.getElementById("waterAttendees").innerHTML = sessionStorage.getItem("waterAttendees") || "";
  document.getElementById("zeroAttendees").innerHTML = sessionStorage.getItem("zeroAttendees") || "";
  document.getElementById("powerAttendees").innerHTML = sessionStorage.getItem("powerAttendees") || "";

  if(sessionStorage.getItem("goalReached") === "true") {
    document.getElementById("celebration").style.display = "block";
  }
})();
