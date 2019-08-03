// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCbEgCEAQNgfkMHIetOs1SogWYoSQRShj8",
  authDomain: "train-scheduler-5741a.firebaseapp.com",
  databaseURL: "https://train-scheduler-5741a.firebaseio.com",
  projectId: "train-scheduler-5741a",
  storageBucket: "",
  messagingSenderId: "32421656068",
  appId: "1:32421656068:web:e5e290f4d2f17578"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Variable to reference Firebase
  var database = firebase.database();
  
  //Displays the current time
  setInterval (function() {
      $(".currentTime").html(moment().format('HH:mm:ss A'))
  }, 1000);

  //Submit changes what is stored in Firebase
  $("#submit").on("click", function(event) {
      //Prevents page from refreshing
      event.preventDefault();

  
      //Get inputs from form
      var trainName = $("#name").val().trim();
      var trainDestination = $("#destination").val().trim();
      var trainTime = moment($("#time").val().trim(), "HH:mm").subtract(10, "y").format("X");
      var frequency = $("#frequency").val().trim();

      //Change what is saved in Firebase
      database.ref().push({
          name: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: frequency
      });

      //Clears the input form after submit button is clicked
      $("#name").val("");
      $("#destination").val("");
      $("#time").val("");
      $("#frequency").val("");

      
  });

  //Function to clear the table to avoid repeating schedules
  function clearTableContent () {
      $('tbody').empty();
  };



  database.ref().on("child_added", function(snapshot) {

    //Clears table to not repeat times
    // clearTableContent();

        var nameSS = snapshot.val().name;
        var destinationSS = snapshot.val().destination;
        var frequencySS = snapshot.val().frequency;
        var timeSS = snapshot.val().time;

      var timeRemainder = moment().diff(moment.unix(timeSS), "minutes")%frequencySS;

      var timeUntilTrainArrival = frequencySS - timeRemainder;

      var nextTrainArrival = moment().add(timeUntilTrainArrival, "minutes").format("hh:mm A");

      $("#trainTable > tbody").append('<tr><td>' + nameSS + 
      '</td><td>' + destinationSS +
      '</td><td>' + frequencySS +
      '</td><td>' + nextTrainArrival +
      '</td><td>' + timeUntilTrainArrival +
      '</td></tr>');
    });
