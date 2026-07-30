#  ESP32 Wi-Fi Tendon Driven Robotic Hand

A tendon-driven robotic hand controlled wirelessly using an ESP32 and a modern web-based dashboard.

The project allows real-time control of six servos over Wi-Fi using any laptop or smartphone connected to the same network. The interface includes individual finger control, preset gestures, and a responsive control panel designed for demonstrations and robotics projects.

---

##  Features

-  Wi-Fi based control (No Bluetooth required)
-  Works on laptops, tablets, and smartphones
-  Individual finger control
-  Preset gestures
  - Open Hand
  - Close Hand
  - Peace 
  - Thumbs Up 
  - Rock 
-  Real-time servo control
-  Modern glassmorphism UI
-  ESP32 Web Server
-  Battery powered operation

---

# Hardware

- ESP32 DevKit V1
- 4 × SG90 Servo Motors
- 2 × MG996R Servo Motors
- External 5–6V Servo Power Supply
- Tendon-driven 3D Printed Hand
- Wi-Fi Network

---

# Servo Mapping

| Finger | GPIO |
|---------|------|
| Pinky | 14 |
| Ring | 13 |
| Middle | 12 |
| Index | 26 |
| Thumb | 19 |
| Fist Release | 27 |

---

# Folder Structure

```
RobotHand/
│
├── index.html
├── style.css
├── script.js
└── expo.ino
```

---

# How it Works

The ESP32 hosts an HTTP server.

The web dashboard sends requests such as:

```
http://ESP32_IP/servo?pin=14&angle=90
```

The ESP32 parses the request and moves the corresponding servo.

---

# Quick Start

1. Upload the Arduino sketch to the ESP32.
2. Update your Wi-Fi credentials.
3. Power the ESP32.
4. Open `index.html` using Live Server or host it on a web server.
5. Enter the ESP32 IP address if needed.
6. Control the robotic hand wirelessly.

---

# Technologies Used

- ESP32
- Arduino IDE
- ESP32Servo Library
- HTML5
- CSS3
- JavaScript
- ESP32 WebServer

---

# Future Improvements

-  Live camera streaming
-  AI gesture recognition
- Joystick/Gamepad support
-  Progressive Web App (PWA)
-  Cloud control
- Motion recording and playback
-  Machine learning gesture prediction
- Voice control
- OTA firmware updates

---

# Screenshots

to be added
---



# Author

Developed as a robotics project using the ESP32 platform.
