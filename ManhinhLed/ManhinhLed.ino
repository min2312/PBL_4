#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);  // SCL A5, SDA A4 trên Arduino Uno

void setup() {
  lcd.init();          // Khởi tạo LCD
  lcd.backlight();     // Bật đèn nền LCD
  Serial.begin(9600);  // Khởi tạo Serial để nhận biển số từ ESP32-CAM
}

void loop() {
  if (Serial.available()) {
    String plate = Serial.readStringUntil('\n');  // Đọc biển số xe từ ESP32-CAM
    plate.trim();  // Loại bỏ khoảng trắng và ký tự newline
    lcd.setCursor(0, 1);
    lcd.print("                ");
    lcd.setCursor(2, 0);
    lcd.print("Chao mung!");  

    int plateLength = plate.length();
    int lcdWidth = 16;  // Kích thước LCD là 16 ký tự
    int position = (lcdWidth - plateLength) / 2;  // Tính toán vị trí căn giữa

    lcd.setCursor(position, 1);
    lcd.print(plate);  // Hiển thị biển số xe ở hàng 2
  }
  delay(2000);  // Chờ 1 giây trước khi kiểm tra tiếp
}
