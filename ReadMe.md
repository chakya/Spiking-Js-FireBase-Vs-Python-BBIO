# IoT Control Panel Team 94 Charles Vincent
### Functionality:
IoT control panel that use firebase as the database the control led and motion sensor from beaglebone. The output of the motion sensor will be Classified  into long(>=3seconds) and short(<3 seconds) motion. The code also detect intrusion by checking the sequence. Intrusion is detected as the sequence of Long Short Long Long.  
### File Overview: 
| File | Function |
| ------ | ------ |
| /app.js/ | For the server to run motion sensor and led|
| /firebaseWebApi.js |For client to send command and receive result. |


### Hardware structure

- Microcontroller : BeagleBone Black with Debian V8.7
- Power supply: Micro USB connected to computer
- Sensors: Motion sensor
- Cables: 5 male to female jumper wires
- Output : led light

### Libraries
- Node.js(pre-installed)
- Bonescript(pre-installed)
- Firebase-admin
- Firebase-tools

### Pin Set UP
##### LED light
- Connect the negative pin to the DGND (P8 02 )
- Connect the positive pin to the GPIO (P8 08)
##### Motion Sensor
- Connect the out pin to GPIO (P8 07) 
- Connect ground pin to  DGND (P8 01)
- Connect  VCC pin to sys_5 (P9 08)


### How to set up

Set up the beaglebone. This includes installing drivers for respective OS.

Once connected. Ssh to the beaglebone by running
```sh
$	ssh root@192.168.7.2
```
Clone this repository into a directory in beaglebone black

Install all the dependencies by running this code on terminal
```sh
$	npm install
```
Run app.js. 
```sh
$   node app.js
```

Run firebase web 
```sh
$   firebase serve -p 5001 -o 192.168.7.2
```

Navigate to your server in your browser
```sh
191.168.7.2:5001
```
