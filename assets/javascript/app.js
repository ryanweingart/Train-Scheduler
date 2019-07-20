// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDhsN2zudiKguLwM_RrHoH8WaHNYF4O1cE",
    authDomain: "train-scheduler-c3ca7.firebaseapp.com",
    databaseURL: "https://train-scheduler-c3ca7.firebaseio.com",
    projectId: "train-scheduler-c3ca7",
    storageBucket: "",
    messagingSenderId: "566144752510",
    appId: "1:566144752510:web:e8a2eaea68268a98"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Variable to reference Firebase
  var database = firebase.database();

  //Initial variables
  var trainName = "";
  var trainDestination = "";
  var trainTime = "";
  var trainFrequency = "";

  //Submit changes what is stored in Firebase
  $("#submit").on("click", function(event) {
      //Prevents page from refreshing
      event.preventDefault();

      //Get inputs from form
      var trainName = $("#name").val().trim();
      var trainDestination = $("#destination").val().trim();
      var trainTime = $("#time").val().trim();
      var trainFrequency = $("#frequency").val().trim();

      //Change what is saved in Firebase
      database.ref().push({
          name: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: trainFrequency
      });
  });