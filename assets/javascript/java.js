var config = {
  apiKey: "AIzaSyDukhLXiqcZ9BW2qkoVHl-cVaLL4wL0w94",
  authDomain: "train-cbdf7.firebaseapp.com",
  databaseURL: "https://train-cbdf7.firebaseio.com",
  projectId: "train-cbdf7",
  storageBucket: "train-cbdf7.appspot.com",
  messagingSenderId: "27580087374"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();
  console.log("submitted something!");
  // Code in the logic for storing and retrieving the new train info.
  // Providing initial data to Firebase database.

  var name = $("#name-input")
    .val()
    .trim();
  var dest = $("#destination")
    .val()
    .trim();
  var time = moment(
    $("#first-train-time")
      .val()
      .trim(),
    "HH:mm".format("X")
  );
  var freq = $("#frequency")
    .val()
    .trim();

  var newTrain = {
    name: name,
    dest: dest,
    time: time,
    freq: freq,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  dataRef.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);
});

dataRef.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());

    name = childSnapshot.val().name;
    dest = childSnapshot.val().dest;
    time = childSnapshot.val().time;
    freq = childSnapshot.val().freq;

    var timeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(timeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);

    // Time apart (remainder)
    var timeRemainder = timeDiff % freq;
    console.log(timeRemainder);

    // Minute Until Train
    var minutesTillTrain = freq - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    var formTime = moment(nextTrain).format("HH:mm");

    // Handle the errors
  },

  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
