var statusHTML=document.getElementById("status");
var timeHTML=document.getElementById("time");
var motion=document.getElementById("cmn-toggle-2");

function Server() {
  this.checkSetup();
  this.initFirebase();
  // this.loadMessages();
}




  Server.prototype.initFirebase = function () {
    this.database = firebase.database();
    this.storage = firebase.storage();
  };


function motionSwitch(){
       if (motion.checked===true) {
         console.log('on')
        firebase.database().ref("/State").update({'/motion/state':1, '/motion/type':'motion'});
       }
      else {
        console.log('off')
        firebase.database().ref("/State").update({'/motion/state':0, '/motion/type':'motion'});
      }

     }


  // Checks that the Firebase SDK has been correctly setup and configured.
  Server.prototype.checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
    } else if (config.storageBucket === '') {
      window.alert('Your Firebase Storage bucket has not been enabled.');
    }
  };


window.onload = function () {
  window.Server = new Server();
};

var motionDataRef = firebase.database().ref('/PIR');
motionDataRef.on('value', function(snapshot) {
  updateHTML(snapshot.val());
});

function updateHTML(data){
  console.log(data.in)
  statusHTML.innerHTML=data.in;
  epoch=Math.round(new Date().getTime()/1000.0)
  var myDate = new Date( epoch *1000);
  time=epoch-parseInt(data.time)
  console.log(time)
  timeHTML.innerHTML=time;
}



