import socketio
import eventlet
from flask import Flask, render_template
import Adafruit_BBIO.GPIO as GPIO
import threading
import eventlet
import time
epoch=time.time()
print(time.time())
print(time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.localtime(epoch)))

eventlet.monkey_patch()
class setInterval():
    def __init__(self, func, sec):
        def func_wrapper():
            self.t = threading.Timer(sec, func_wrapper)
            self.t.start()
            func()
        self.t = threading.Timer(sec, func_wrapper)
        self.t.start()

    def cancel(self):
        self.t.cancel()


sio = socketio.Server()
app = Flask(__name__)
sio.emit('motionDetected',1)

def checkPIR():
    client.emit('checkTime',time.time())
    if GPIO.input(motion):
        print('motion detected')
        client.emit('motionDetected','HIGH')
    else:
        print('no motion deteted')
        client.emit('motionDetected','LOW')
        

@app.route('/')
def index():
    """Serve the client-side application."""
    return render_template('index.html')

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('motionToggle')
def ledToggle(sid, data):
    global client
    client=sio
    client.emit('motionDetected',2)
    print('motionToggle'+str(data) )
    if data==1:
       global t
       t= setInterval(checkPIR,1)
    else:
        print('stop')
        t.cancel()



@sio.on('disconnect')
def disconnect(sid):
    t.cancel()
    print('disconnect ', sid)

if __name__ == '__main__':
    motion = "P8_7"
    GPIO.setup(motion, GPIO.IN)
    # currentCount=0
    # motionCount=0
    # longCount=0
    # shortCount=0
    # currentCount=0
    # wrap Flask application with socketio's middleware
    app = socketio.Middleware(sio, app)

    # deploy as an eventlet WSGI server
    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
    
   
    
    
    