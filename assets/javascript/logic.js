$(document).ready(function() {
    
    var config = {
	    apiKey: "AIzaSyA9zP30V4W9Ux7a2nhlWhc7hJzMFXO6Ozo",
	    authDomain: "train-scheduler-1bb3e.firebaseapp.com",
	    databaseURL: "https://train-scheduler-1bb3e.firebaseio.com/",
  	};

	firebase.initializeApp(config);

    var database = firebase.database();
    
    $(".submitInput").on("click", function (event) {
        var nameInput = $("#nameInput").val().trim();
        var destinationInput = $("#destinInput").val().trim();
        var timeInput = $("#timeInput").val().trim();
        var frequencyInput = $("#freqInput").val().trim();

        if (nameInput != "" &&
                destinationInput != "" &&
                timeInput.length === 4 &&
                frequencyInput != "") {

                    database.ref().push({
                        name: nameInput,
                        destination: destinationInput,
                        time: timeInput,
                        frequency: frequencyInput,
                    });


                } else {
                    alert("Please enter valid data");
                    $("input").val("");
                    return false;
                }
                console.log(database);

                $("input").val("");
    }); 

    database.ref().on("child_added", function (childSnapshot) {
		// console.log(childSnapshot.val());

		var name = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;
        
        var frequency = parseInt(frequency);
        var currentTime = moment();
        var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");
        var trainTime  = moment(dateConvert).format("HHmm");
        var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
        var timeDifference = moment().diff(moment(timeConvert), "minutes");
        var timeRemaining = timeDifference % frequency;
        var timeAway = frequency - timeRemaining;
        var nextArrival = moment().add(timeAway, "minutes");
        var arrivalDisplay = moment(nextArrival).format("HHmm");

    $("#boardText").append(
        "<tr><td id='nameDisplay'>" + childSnapshot.val().name + 
        "<td id='destinationDisplay'>" + childSnapshot.val().destination + 
        "<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
        "<td id='arrivalDisplay'>" + arrivalDisplay + 
        "<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");
        });

    $(".resetInput").on("click", function(event){
        location.reload();
    });
    
        
    setInterval("window.location.reload()", 60000);
    
});
