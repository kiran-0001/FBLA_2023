// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// init firebase
firebase.initializeApp(firebaseConfig);

// reference database
var entryFormDB = firebase.database().ref("studentEntries");

document
  .getElementById("totalEntryForm")
  .addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var FirstName = getElementVal("FirstName");
  var LastName = getElementVal("LastName");
  var date = getElementVal("date");
  var grades = getElementVal("grades");
  var points = 0;

  //TODO - add query for tab selector radio type elements
  var sportingEvent = document.querySelector('input[name="sportEvent"]:checked').value;
  var otherEvent = document.querySelector('input[name="otherEvent"]:checked').value;

  if (sportingEvent != "none") {
    points++;
  }
  if (otherEvent != "none") {
    points++;
  }
  //verify data fetching
  console.log(FirstName, LastName, date, grades, sportingEvent, otherEvent, points);

  saveEntry(FirstName, LastName, date, grades, sportingEvent, otherEvent, points);

  //reset form after submission
  document.getElementById("totalEntryForm").reset();
}

//add entry to firebase db
const saveEntry = (firstName, lastName, eventDate, studentGrade, sportEventTitle, otherEventTitle, pointTotal) => {
  //config node name in lieu of rand key gen 
  var entryName = firstName + "_" + lastName;
  var newEntry = entryFormDB.child(entryName);

  //entry push fields
  newEntry.set({
    firstName: firstName,
    lastName: lastName,
    eventDate: eventDate,
    studentGrade: studentGrade,
    sportEventTitle: sportEventTitle,
    otherEventTitle: otherEventTitle,
    pointTotal: pointTotal
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
