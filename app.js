var admin = require("firebase-admin");
var b = require('bonescript');

//Initialize all var needed for beaglebone
var led = "P8_8";
b.pinMode(led, 'out');
var motion = "P8_7";
var motionInterval=null;
b.pinMode(motion, b.INPUT);
// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");
var currentCount=0;
var seq4='0000'
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assignment-2-team-94-482d5.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var stateRef = db.ref("/State"); // channel name
var motionData= db.ref("/motionData")
// ledRef.off()

// ref.on("value", function(snapshot) {   //this callback will be invoked with each new object
//   console.log(snapshot.val());         // How to retrive the new added object
// }, function (errorObject) {             // if error
//   console.log("The read failed: " + errorObject.code);
// });

// How to push new object
// ref.push({
//     id:2,
//     type:'paradise',
//     action:'on',
//     time:127818271
// });
