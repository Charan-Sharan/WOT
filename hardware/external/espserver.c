#include <WiFi.h>
#include <WebServer.h>

// WiFi credentials
const char* ssid = "Tenda_3AFDF8";       
const char* password = ""; 

WebServer server(80);

const int relays[]={4,5,15,18} ;
int relayStates[]={1,1,1,1};
const int numOfRelays = sizeof(relays)/sizeof(relays[0]); 

void handleControlRelay() {
  int relayNum = server.arg("relay").toInt(); 
  // String action = server.arg("action"); 
  relayStates[relayNum-1]=1-relayStates[relayNum-1];
  digitalWrite(relays[relayNum-1], relayStates[relayNum-1]);
  server.send(200, "text/plain", "Relay "+String(relayNum)+" toggled");
}
// Function to handle invalid requests
void handleNotFound() {
  server.send(404, "text/plain", "Endpoint not found");
}

void setup() {
  Serial.begin(115200);

  for(int i=0;i<numOfRelays;i++){
    pinMode(relays[i], OUTPUT);
    digitalWrite(relays[i], HIGH);
  }

  // Connect to WiFi
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());

  // Define API endpoint
  server.on("/relay", HTTP_POST, handleControlRelay); 
  server.onNotFound(handleNotFound);

  // Start the server
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  server.handleClient(); 
}
