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
      console.log(trainName);
      console.log(trainDestination);
      console.log(trainTime);
      console.log(trainFrequency);
  });

  database.ref().on("value", function(snapshot) {
      
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
  });
