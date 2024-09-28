#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <Servo.h> 

const char* ssid = "Quang Minh";
const char* password = "khongcanbiet";

LiquidCrystal_I2C lcd(0x27, 16, 2);
WebSocketsServer webSocket = WebSocketsServer(81);

String licensePlate = "";
Servo myServo;
int servoPin = D4;
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

  if (licensePlate.length() > 0) {
    lcd.clear();
    lcd.setCursor(2, 0);
    lcd.print("Chao mung!");
    lcd.setCursor((16 - licensePlate.length()) / 2, 1);
    lcd.print(licensePlate);
    myServo.write(90); 
    delay(5000);
    myServo.write(0);
    licensePlate = ""; 
    delay(5000);
  }
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_TEXT) {
    licensePlate = String((char*)payload);  // Lấy biển số xe từ WebSocket message
    Serial.println("Biển số nhận được: " + licensePlate);
  }
}
