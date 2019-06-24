
#include <ESP8266WiFi.h>



void setup() {
  Serial.begin(115200);
  pinMode(14,INPUT);
  pinMode(12,INPUT);
  // put your setup code here, to run once:
  Serial.println("Setup Finished");

}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print(digitalRead(12));
  Serial.print("\t");
  Serial.print(digitalRead(14));
  Serial.println();
  delay(50);

}
