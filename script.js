//======================================
// ESP32 IP ADDRESS
//======================================

const ESP32_IP = "10.152.171.254";


//======================================
// Slider References
//======================================

const servos = {
    14: document.getElementById("servo14"),
    13: document.getElementById("servo13"),
    12: document.getElementById("servo12"),
    26: document.getElementById("servo26"),
    19: document.getElementById("servo19"),
    27: document.getElementById("servo27")
};


//======================================
// Finger Definitions
//======================================

const finger = {

    pinky : { pin:14, OPEN:0,   CLOSED:180 },

    ring  : { pin:13, OPEN:180, CLOSED:0 },

    middle: { pin:12, OPEN:180, CLOSED:0 },

    index : { pin:26, OPEN:180, CLOSED:0 },

    thumb : { pin:19, OPEN:0,   CLOSED:180 }

};


//======================================
// Wrist / Fist Release
//======================================

const wrist = {

    pin:27,

    OPEN:0,

    CLOSED:180

};


//======================================
// Send Servo Command
//======================================

function sendServo(pin, angle){

    fetch(`http://${ESP32_IP}/servo?pin=${pin}&angle=${angle}`)

    .catch(error=>console.log(error));

}


//======================================
// Move Servo
//======================================

function setServo(pin, angle){

    servos[pin].value = angle;

    document.getElementById("value"+pin).innerHTML = angle + "°";

    sendServo(pin, angle);

}


//======================================
// Attach Sliders
//======================================

Object.keys(servos).forEach(pin=>{

    servos[pin].addEventListener("input",()=>{

        setServo(Number(pin), Number(servos[pin].value));

    });

});


//======================================
// Smooth Motion
//======================================

function smoothMove(pin, target){

    let current = Number(servos[pin].value);

    let step = current < target ? 1 : -1;

    let timer = setInterval(()=>{

        current += step;

        servos[pin].value = current;

        document.getElementById("value"+pin).innerHTML = current + "°";

        sendServo(pin,current);

        if(current == target){

            clearInterval(timer);

        }

    },5);

}


//======================================
// Hand Pose Helper
//======================================

function applyPose(pose){

    for(const pin in pose){

        smoothMove(Number(pin), pose[pin]);

    }

}


//======================================
// OPEN HAND
//======================================

function openHand(){

    applyPose({

        14:finger.pinky.OPEN,

        13:finger.ring.OPEN,

        12:finger.middle.OPEN,

        26:finger.index.OPEN,

        19:finger.thumb.OPEN,

        27:wrist.OPEN

    });

}


//======================================
// CLOSE HAND
//======================================

function closeHand(){

    applyPose({

        14:finger.pinky.CLOSED,

        13:finger.ring.CLOSED,

        12:finger.middle.CLOSED,

        26:finger.index.CLOSED,

        19:finger.thumb.CLOSED,

        27:wrist.CLOSED

    });

}


//======================================
// THUMBS UP
//======================================

function thumbsUp(){

    applyPose({

        14:finger.pinky.CLOSED,

        13:finger.ring.CLOSED,

        12:finger.middle.CLOSED,

        26:finger.index.CLOSED,

        19:finger.thumb.OPEN,

        27:wrist.CLOSED

    });

}


//======================================
// PEACE
//======================================

function peaceSign(){

    applyPose({

        14:finger.pinky.CLOSED,

        13:finger.ring.CLOSED,

        12:finger.middle.OPEN,

        26:finger.index.OPEN,

        19:finger.thumb.CLOSED,

        27:wrist.CLOSED

    });

}


//======================================
// ROCK
//======================================

function rockSign(){

    applyPose({

        14:finger.pinky.OPEN,

        13:finger.ring.CLOSED,

        12:finger.middle.CLOSED,

        26:finger.index.OPEN,

        19:finger.thumb.CLOSED,

        27:wrist.CLOSED

    });

}


//======================================
// RESET
//======================================

function resetAll(){

    applyPose({

        14:90,

        13:90,

        12:90,

        26:90,

        19:90,

        27:90

    });

}
