var led=document.getElementById("cmn-toggle-1");
var motion=document.getElementById("cmn-toggle-2");
var motionCount=document.getElementById('motionCount');
var longHTML=document.getElementById('longMotionHTML');
var shortHTML=document.getElementById('shortMotionHTML');
var intruderHTML=document.getElementById('intruderHTML');

function Server() {
  this.checkSetup();
  this.initFirebase();
  // this.loadMessages();
  this.ledDB();
this.motionDB();
}
    // this.switchLED();



  Server.prototype.initFirebase = function () {
    this.database = firebase.database();
    this.storage = firebase.storage();
  };


  // Server.prototype.loadMessages = function () {
  //   // Reference to the /messages/ database path.
  //   this.messagesRef = this.database.ref('motionSensorData');
  //   // Make sure we remove all previous listeners.
  //   this.messagesRef.off();
//
      // Loads the last 50 messages and listen for new ones.
  //   var setMessage = function (data) {
  //     var val = data.val();
  //     this.displayMessage(val.action, val.id, val.time, val.type);
  //   }.bind(this);
  //   this.messagesRef.limitToLast(50).on('child_added', setMessage);
  //   this.messagesRef.limitToLast(50).on('child_changed', setMessage);
  // };
Server.prototype.ledDB = function () {
    ledState = this.database.ref('ledState');
    // Make sure we remove all previous listeners.
    ledState.off();
}
Server.prototype.motionDB = function () {
    motionState = this.database.ref('motionState');
    // Make sure we remove all previous listeners.
    motionState.off();
}
//   Server.prototype.switchLED = function () {
//     // Reference to the /messages/ database path.
//     this.ledState = this.database.ref('ledState');
//     // Make sure we remove all previous listeners.
//     this.ledState.off();

//     var setMessage = function (data) {
//       var val = data.val();
//     //   this.displayMessage(val.action, val.id, val.time, val.type);
//     // }.bind(this);
//         if (val.type=='ledToggle'){
//             motionCount.innerText = val.type;
//             console.log('test')
//     }
// console.log('wowo')  
// }
    // ledState.limitToLast(50).on('child_added', setMessage);
    // ledState.limitToLast(50).on('child_changed', setMessage);
//   ;}
    