/*
  Minimal Esp32 Websockets Server

  This sketch:
        1. Connects to a WiFi network
        2. Starts a websocket server on port 80
        3. Waits for connections
        4. Once a client connects, it wait for a message from the client
        5. Sends an "echo" message to the client
        6. closes the connection and goes back to step 3

  Hardware:
        For this sketch you only need an ESP32 board.

  Created 15/02/2019
  By Gil Maimon
  https://github.com/gilmaimon/ArduinoWebsockets
*/

#include <ArduinoWebsockets.h>
#include <ESP8266Wifi.h>

#define laser 12
#define target 14

const char* ssid = "HOTFiber-016F"; //Enter SSID
const char* password = "0506213350"; //Enter Password
bool laserFlag=0, targetFlag=0;
using namespace websockets;

WebsocketsClient client;

WebsocketsServer server;
void setup() {
  pinMode(laser,INPUT);
  pinMode(target,INPUT);
  Serial.begin(115200);
  // Connect to wifi
  
  WiFi.begin(ssid, password);
  
  // Wait some time to connect to wifi
  for(int i = 0; i < 15 && WiFi.status() != WL_CONNECTED; i++) {
      Serial.print(".");
      delay(1000);
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());   //You can get IP address assigned to ESP

  server.listen(80);
  Serial.print("Is server live? ");
  Serial.println(server.available());
  client = server.accept();
  Serial.println(">>> Client is connected");
}

void loop() 
{
  
  if(client.poll()) 
  {
    Serial.println("client is AVAILABLE");
    delay(100);
    WebsocketsMessage msg = client.readBlocking();

    // log
    Serial.print("Got Message: ");
    Serial.println(msg.data());

    // return echo
    client.send("Echo: " + msg.data());
//    if(msg.data.equals('?finish") == 0)
      client.close();

  }

  if (digitalRead(laser)&&laserFlag==0)
  {
    laserFlag=1;
    
    Serial.println(">>>sending ");
    client.send("laser crossed");
  }
  if(digitalRead(laser)==0)
  {
    laserFlag=0;
  }


  if ((digitalRead(target)==0)&&targetFlag==0)
  {
    targetFlag=1;
    
    Serial.println(">>>sending ");
    client.send("target hit");
  }
  if(digitalRead(target))
  {
    targetFlag=0;
  }
  
  
}

void serialClear()
{
  while (Serial.available() > 0)
  {
    char t = Serial.read();
  }
}
