var admin = require("firebase-admin");
var b = require('bonescript');

//Initialize all var needed for beaglebone
var motion = "P8_7";
var motionInterval=null;
b.pinMode(motion, b.INPUT);
// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");
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

stateRef.limitToLast(50).on('child_changed', toggle);
    
function toggle(data){
  var val = data.val();
  if (val.type=='led'){
  toggleLed(val.state);
  }
  else{
  toggleMotion(val.state)
  }
}

function toggleMotion(state){
  if (state===1)// if checked activate motion detector
  {
    motionInterval=setInterval(checkPIR, 1000); // Checks the Sensor Every Second
    function checkPIR(){
    b.digitalRead(motion, printStatus);
  }
  

    
    function printStatus(x) 
    {
        if(x.value === 1){
        console.log("Motion Detected");
        // socket.emit("motionDetected", currentCount)
       }
            
        else
        {
        console.log("No Motion Detected");
       }
    }
  else
  {
      // if unchecked stop interval
      console.log('stop');
      clearInterval(motionInterval);
  }

}
