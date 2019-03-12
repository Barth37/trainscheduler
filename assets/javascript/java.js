var config = {
    apiKey: "<API_KEY>",
    authDomain: "myproject-8f3b8.firebaseapp.com",
    databaseURL: "https://myproject-8f3b8.firebaseio.com",
    storageBucket: "myproject-8f3b8.appspot.com"

};
firebase.initializeApp(config);

var dataRef = firebase.database();


$("#submit").submit(function(event) {
    event.preventDefault();

    // Code in the logic for storing and retrieving the new train info.
    // Providing initial data to Firebase database.

    var name = $("#name-input").val().trim();
    var dest = $("#destination").val().trim();
    var time = moment($("#first-train-time").val().trim(), "HH:mm".format("X"));
    var freq = $("#frequency").val().trim();

    var newTrain= {
        name: name,
        dest: dest,
        time: time,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    };

    database.ref().push(newTrain);
        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.time);
        console.log(newTrain.freq);
    });

    dataRef.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        
        
        var name = childSnapshot.val().name;
        var dest = childSnapshot.val().dest;
        var time = childSnapshot.val().time;
        var freq = childSnapshot.val().freq;

        var firstTimeConverted = moment(timeStart, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequencyRate;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequencyRate - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
        var formattedTime = moment(nextTrain).format("HH:mm");

      // Handle the errors
    }, 

    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

    });


