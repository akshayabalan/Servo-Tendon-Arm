#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>

//==============================
// WiFi Credentials
//==============================

const char* ssid = "Akshay";
const char* password = "15021502";

//==============================
// Web Server
//==============================

WebServer server(80);

//==============================
// Servo Objects
//==============================

Servo servo14;
Servo servo13;
Servo servo12;
Servo servo26;
Servo servo19;
Servo servo27;

//==============================
// Move Servo Function
//==============================

void moveServo(int pin, int angle)
{
    angle = constrain(angle, 0, 180);

    switch(pin)
    {
        case 14:    // Normal
            servo14.write(angle);
            break;

        case 13:    // Reversed
            servo13.write(180 - angle);
            break;

        case 12:    // Reversed
            servo12.write(180 - angle);
            break;

        case 26:    // Reversed
            servo26.write(180 - angle);
            break;

        case 19:    // Normal
            servo19.write(angle);
            break;

        case 27:    // Reversed
            servo27.write(180 - angle);
            break;

        default:
            return;
    }

    Serial.printf("GPIO %d -> %d°\n", pin, angle);
}

//==============================
// HTTP Request Handler
//==============================

void handleServo()
{
    if(!server.hasArg("pin") || !server.hasArg("angle"))
    {
        server.send(400, "text/plain", "Missing pin or angle");
        return;
    }

    int pin = server.arg("pin").toInt();
    int angle = server.arg("angle").toInt();

    moveServo(pin, angle);

    server.send(200, "text/plain", "OK");
}

//==============================
// Root Page
//==============================

void handleRoot()
{
    server.send(200, "text/plain", "ESP32 Tendon Arm Ready");
}

//==============================
// Setup
//==============================

void setup()
{
    Serial.begin(115200);

    // Allow PWM generation
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);

    // Attach Servos
    servo14.attach(14);
    servo13.attach(13);
    servo12.attach(12);
    servo26.attach(26);
    servo19.attach(19);
    servo27.attach(27);

    // Neutral Position
    servo14.write(90);
    servo13.write(90);
    servo12.write(90);
    servo26.write(90);
    servo19.write(90);
    servo27.write(90);

    // WiFi
    WiFi.begin(ssid, password);

    Serial.print("Connecting");

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("Connected!");

    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());

    // Routes
    server.on("/", handleRoot);
    server.on("/servo", handleServo);

    server.begin();

    Serial.println("Web Server Started");
}

//==============================
// Loop
//==============================

void loop()
{
    server.handleClient();
}