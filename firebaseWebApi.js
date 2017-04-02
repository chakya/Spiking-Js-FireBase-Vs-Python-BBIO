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

