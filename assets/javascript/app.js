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

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var trainTime = "";
  var trainFrequency = "";

  $("#submit").on("click", function(event) {
      
  })