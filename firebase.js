// -------------------------------------------------------------------------------------------------------------------
// DATABASE & MAIN BACKEND CODE
// -------------------------------------------------------------------------------------------------------------------


//Firebase Configurations

const firebaseConfig = {
  apiKey: "AIzaSyA8zVnO0fL99J99bRxTqcZbmKvdxdYPWDs",
  authDomain: "fblacap2023.firebaseapp.com",
  databaseURL: "https://fblacap2023-default-rtdb.firebaseio.com",
  projectId: "fblacap2023",
  storageBucket: "fblacap2023.appspot.com",
  messagingSenderId: "928148561689",
  appId: "1:928148561689:web:e39e9b05925f81cf78ef88",
  measurementId: "G-JQYWB5VZ5C",
};

// Init Firebase

firebase.initializeApp(firebaseConfig);

// Database Variables
var entryFormDB = firebase.database().ref("studentEntries");

document
  .getElementById("totalEntryForm")
  .addEventListener("submit", submitForm);

// Function to Submit Form

function submitForm(e) {
  e.preventDefault();

  var FirstName = getElementVal("FirstName");
  var LastName = getElementVal("LastName");
  var studentID = getElementVal("studentID")
  var date = getElementVal("date");
  var grades = getElementVal("grades");
  var points = 0;

  //query for tab selector radio type elements
  var sportingEvent = document.querySelector('input[name="sportEvent"]:checked').value;
  var otherEvent = document.querySelector('input[name="otherEvent"]:checked').value;

  if (sportingEvent != "none") {
      points++;
  }
  if (otherEvent != "none") {
      points++;
  }

  // fix spaces edge case
  FirstName.replaceAll(" ", "");
  LastName.replaceAll(" ", "");

  //verify data fetching
  console.log(FirstName, LastName, studentID, date, grades, sportingEvent, otherEvent, points);

  saveEntry(FirstName, LastName, studentID, date, grades, sportingEvent, otherEvent, points);

  //reset form after submission

  alert("Submitted Successfully!")
  document.getElementById("totalEntryForm").reset();
}

//add entry to firebase db
const saveEntry = (firstName, lastName, studentID, eventDate, studentGrade, sportEventTitle, otherEventTitle, pointTotal) => {

  var entryName = firstName+ " " + lastName+"-"+studentID;
  var currPoints = pointTotal;
  var prevPoints = getPointTotal(entryName);
  currPoints += prevPoints;

  const userData = ({
      firstName: firstName,
      lastName: lastName,
      studentID: studentID,
      eventDate: eventDate,
      studentGrade: studentGrade,
      sportEventTitle: sportEventTitle,
      otherEventTitle: otherEventTitle,
      pointTotal: currPoints
  })

  var newEntry = entryFormDB.child(entryName);
  newEntry.set(userData);
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

function getPointTotal(userPath) {

  var sent = 0;
  var user_ref = firebase.database().ref('studentEntries/' + userPath);

  user_ref.on('value', function(snapshot) {
      if(snapshot.val() != undefined && snapshot.val() != null) {
          var data = snapshot.val()
          sent = data.pointTotal;
      }
  })
  return sent;
}

function retrieveSophomores() {

  document.getElementById("sophReport").innerHTML="";

  var returnArr = []

  firebase.database().ref('studentEntries').on('value', function(snapshot) {
      snapshot.forEach (
          function(childSnapshot) {
              var firstName = childSnapshot.val().firstName;
              var lastName = childSnapshot.val().lastName;
              var studentID = childSnapshot.val().studentID;
              var points = childSnapshot.val().pointTotal;
              var gradeLevel = childSnapshot.val().studentGrade;

              if (gradeLevel == "10th") {
                  let entry = firstName + " " + lastName + " [#" + studentID + "] " + "has " + points + " points" + "\n";
                  returnArr.push(entry);
              }
          }
      )

      for(let entryy of returnArr) {
          update(entryy,"sophReport")
      }
  });
}

function retrieveJuniors() {

  document.getElementById("juniorReport").innerHTML="";

  var returnArr = []
  firebase.database().ref('studentEntries').on('value', function(snapshot) {
      snapshot.forEach (
          function(childSnapshot) {
              var firstName = childSnapshot.val().firstName;
              var lastName = childSnapshot.val().lastName;
              var studentID = childSnapshot.val().studentID;
              var points = childSnapshot.val().pointTotal;
              var gradeLevel = childSnapshot.val().studentGrade;

              if (gradeLevel == "11th") {
                  let entry = firstName + " " + lastName + " [#" + studentID + "] " + "has " + points + " points" + "\n";
                  returnArr.push(entry);
              }

          }
      )

      for(let entryy of returnArr) {
          update(entryy, "juniorReport")
      }
  });
}

function retrieveSeniors() {

  document.getElementById("seniorReport").innerHTML="";

  var returnArr = []
  firebase.database().ref('studentEntries').on('value', function(snapshot) {
      snapshot.forEach (
          function(childSnapshot) {
              var firstName = childSnapshot.val().firstName;
              var lastName = childSnapshot.val().lastName;
              var studentID = childSnapshot.val().studentID;
              var points = childSnapshot.val().pointTotal;
              var gradeLevel = childSnapshot.val().studentGrade;

              if (gradeLevel == "12th") {
                  let entry = firstName + " " + lastName + " [#" + studentID + "] " + "has " + points + " points" + "\n";
                  returnArr.push(entry);
              }

          }
      )

      for(let entryy of returnArr) {
          update(entryy, "seniorReport")
      }
  });
}

function winners() {
  document.getElementById("sophWinners").innerHTML="";
  document.getElementById("juniorWinners").innerHTML="";
  document.getElementById("seniorWinners").innerHTML="";
  document.getElementById("prizeWinners").innerHTML="";

  var prizeWinner = []
  var sophs = []
  var juniors = []
  var seniors = []

  firebase.database().ref('studentEntries').on('value', function(snapshot) {
      snapshot.forEach (
          function(childSnapshot) {
              var firstName = childSnapshot.val().firstName;
              var lastName = childSnapshot.val().lastName;
              var studentID = childSnapshot.val().studentID;
              var points = childSnapshot.val().pointTotal;
              var studentGrade = childSnapshot.val().studentGrade;

              let entry = firstName + " " + lastName + " [#" + studentID + "]" + "\n";
              if (points >= 3) {
                  prizeWinner.push(entry);
              }


              switch(studentGrade) {
                  case "10th":
                      sophs.push([entry, points]);
                      break;
                  case "11th":
                      juniors.push([entry, points]);
                      break;
                  case "12th":
                      seniors.push([entry, points])
                      break;
              }

          }
      )

      var sophHighest = []
      var juniorHighest = []
      var seniorHighest = []

      for(let soph of sophs) {
          if(sophHighest.length < 1) {sophHighest.push(soph)}
          else {
              if(sophHighest[0][1] < soph[1]) {
                  sophHighest.pop()
                  sophHighest.push(soph)
              }
          }
      }

      for(let junior of juniors) {
          if(juniorHighest.length < 1) {juniorHighest.push(junior)}
          else {
              if(juniorHighest[0][1] < junior[1]) {
                  juniorHighest.pop()
                  juniorHighest.push(junior)
              }
          }
      }

      for(let senior of seniors) {
          if(seniorHighest.length < 1) {seniorHighest.push(senior)}
          else {
              if(seniorHighest[0][1] < senior[1]) {
                  seniorHighest.pop()
                  seniorHighest.push(senior)
              }
          }
      }

      update("Highest Points: " + String(sophHighest[0][0]), "sophWinners");
      update("Highest Points: " + String(juniorHighest[0][0]), "juniorWinners");
      update("Highest Points: " + String(seniorHighest[0][0]), "seniorWinners");

      var randomSoph = sophs[Math.floor(Math.random()*sophs.length)];
      var randomJunior = juniors[Math.floor(Math.random()*juniors.length)];
      var randomSenior = seniors[Math.floor(Math.random()*seniors.length)];

      while(randomSoph[0] == sophHighest[0][0] || randomSoph[1] < 1) {
          randomSoph = sophs[Math.floor(Math.random() * sophs.length)];
      }

      while(randomJunior[0] == juniorHighest[0][0] || randomJunior[1] < 1) {
          randomJunior = juniors[Math.floor(Math.random()*juniors.length)];
      }

      while(randomSenior[0] == seniorHighest[0][0] || randomSenior[1] < 1) {
          randomSenior = seniors[Math.floor(Math.random()*seniors.length)];
      }

      update("Random Winner: " + String(randomSoph[0]), "sophWinners");
      update("Random Winner: " + String(randomJunior[0]), "juniorWinners");
      update("Random Winner: " + String(randomSenior[0]), "seniorWinners");

      for(let winner of prizeWinner) {
          update(winner, "prizeWinners")
      }
  });
}
function generateReport() {
  document.location = "report.html";
}

function generateWinners() {
  document.location = "winners.html";
}

function update(text, ulID) {
  // Add New LI's
  var node = document.createElement('li');
  node.appendChild(document.createTextNode(text))
  document.getElementById(ulID).appendChild(node)
}