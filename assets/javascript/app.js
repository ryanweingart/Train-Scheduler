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

database.ref().on("value", function(snapshot) {

    //Clears table to not repeat times
    clearTableContent();

    snapshot.forEach(function(childSnapshot) {
        //Variables to hold child snapshots from Firebase
        var nameSS = childSnapshot.val().name;
        var destinationSS = childSnapshot.val().destination;
        var frequencySS = childSnapshot.val().frequency;
        var timeSS = childSnapshot.val().time;

        //Variable that sets train time back one year to ensure future arrivals
        var trainReset = moment(timeSS, "hh:mm").subtract(1, "y");

        //Variables used to calculate how much time until the next train arrives
        var timeDifference = moment().diff(moment(trainReset, "hh:mm"), "minutes");
        var timeRemainder = timeDifference % frequencySS;
        var timeUntilTrainArrival = frequencySS - timeRemainder;

        //Variable to show what time next train will arrive
        var nextTrainArrival = moment().add(timeUntilTrainArrival, "minutes");

        //jQuery that will append values into new rows
        $("tbody").append('<tr><td>' + nameSS + 
        '</td><td>' + destinationSS +
        '</td><td>' + frequencySS +
        '</td><td>' + nextTrainArrival.format("hh:mm A") +
        '</td><td>' + timeUntilTrainArrival +
        '</td></tr>');
    });
});