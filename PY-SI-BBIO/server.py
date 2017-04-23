import socketio
import eventlet
from flask import Flask, render_template
import Adafruit_BBIO.GPIO as GPIO

sio = socketio.Server()
app = Flask(__name__)
sio.emit('motionDetected',1)
        

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
    
   
    
    
    