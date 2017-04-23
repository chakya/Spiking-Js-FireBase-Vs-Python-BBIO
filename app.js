// Declare Variables
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var b = require('bonescript');
var motion = "P8_7";

//Send index.html for root directory
app.get('/', function (req, res) 
{
    //send the index.html file for all requests
    res.sendFile(__dirname + '/index.html');
    });
    http.listen(3001, function () {
    console.log('listening on *:3001');
});

//new io connection
io.on('connection', function (socket) 
{
    console.log('Get a connection');
     
    socket.on('motionToggle', function (status)
    {
         if (status===1)// if checked activate motion detector
         {
            motionInterval=setInterval(checkPIR, 1000); // Checks the Sensor Every Second
            function checkPIR(){
            b.digitalRead(motion, printStatus);
         }
            
            function printStatus(x) 
            {
                if(x.value === 1){
                console.log("Motion Detected");
                socket.emit("motionDetected", currentCount)
                currentCount+=1
            }
                    
                else
                {
                console.log("No Motion Detected");
                     console.log(longCount)
                     if (currentCount>=3)// if motion more than 3 seconds
                     {
                         console.log('long');
                         longCount+=1;
                         motionCount+=1;
                         //pass long count and motion count to be updated in client html 
                         socket.emit('longMotionPoll',longCount, motionCount)
                         currentCount=0;
                     }
                     else if(currentCount>=1){// if 1<= motion<3 
                         console.log('short')
                         shortCount+=1;
                         motionCount+=1;
                         //pass short count and motion count to be updated in client html 
                         socket.emit('shortMotionPoll',shortCount, motionCount)
                         currentCount=0;
                     }
            }
        }
         }
         else
         {
             // if unchecked stop interval
             console.log('stop');
             clearInterval(motionInterval);
         }

    });
    
});

