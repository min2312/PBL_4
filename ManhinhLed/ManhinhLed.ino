#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <Servo.h> 

const char* ssid = "Toanlake";
const char* password = "123456789";

LiquidCrystal_I2C lcd(0x27, 16, 2);
WebSocketsServer webSocket = WebSocketsServer(81);

String message  = "";
Servo myServo;
int servoPin = 2;
unsigned long servoStartTime = 0;
bool servoMoving = false;
void setup() {
  Serial.begin(115200);  
  // Khởi động LCD
  lcd.init();          
  lcd.backlight();     

  // Khởi động servo
  myServo.attach(servoPin);
  myServo.write(0); 

  // Kết nối WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Đang kết nối WiFi...");
  }
  Serial.println("Đã kết nối WiFi!");
  Serial.println(WiFi.localIP());

  // Khởi động WebSocket server
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);  // Xử lý sự kiện WebSocket

  Serial.println("WebSocket server đã khởi động!");
}

void loop() {
  webSocket.loop();  // Lắng nghe các kết nối WebSocket
  if (servoMoving && (millis() - servoStartTime >= 3000)) {
    myServo.write(0);
    delay(500); 
    servoMoving = false; 
    message = "";
  }
  if (message.length() > 0 && !servoMoving) {
    if(isLicensePlate(message)){
      lcd.clear();
      lcd.setCursor(2, 0);
      lcd.print("WelCome!");
      lcd.setCursor((16 - message.length()) / 2, 1);
      lcd.print(message);
      myServo.write(180);
      delay(500); 
      servoStartTime = millis();  
      servoMoving = true; 
    }else{
      if (message.startsWith("Good Bye-")) {
        String licensePlate = message.substring(9); 
        lcd.clear();
        lcd.setCursor(2, 0);  
        lcd.print("Good Bye");
        lcd.setCursor((16 - licensePlate.length()) / 2, 1);  
        lcd.print(licensePlate);
        myServo.write(180); 
        delay(500);
        servoStartTime = millis();
        servoMoving = true;
      }else{
        lcd.clear();
        lcd.setCursor(0,0);
        lcd.print(message);
      }
    }
  }
}
bool isLicensePlate(String msg) {
  return (msg.length() >= 5 && msg.length() <= 10); 
}
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_TEXT) {
    message = String((char*)payload);  // Lấy thông điệp từ WebSocket
    Serial.println("message nhận được: " + message);
  }
}
