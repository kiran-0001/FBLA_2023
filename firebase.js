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
    measurementId: "G-JQYWB5VZ5C"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig);

  // reference database
  var entryFormDB = firebase.database().ref('studentEntries')

  document.getElementById('totalEntryForm').addEventListener('submit', submitForm)

  function submitForm(e) {
    e.preventDefault();

    var FirstName = getElementVal('FirstName')
    var LastName = getElementVal('LastName')
    var date = getElementVal('date')
    var grades = getElementVal('grades')

    //TODO - add queries for tab selector elements 
    //var sportingEvent = getElementVal('sportingEvent')
    //var otherEvent = getElementVal('otherEvent')

    //verifiy data fetching
    //console.log(firstName, lastName, eventDate, studentGrade)

    saveEntry(FirstName, LastName, date, grades);

    //reset form after submission
    document.getElementById('totalEntryForm').reset(); 
  }

  //add entry to firebase db
  const saveEntry = (firstName, lastName, eventDate, studentGrade) => {
    var newEntry = entryFormDB.push();
    newEntry.set({
        firstName : firstName,
        lastName : lastName,
        eventDate : eventDate,
        studentGrade : studentGrade
    })
  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }