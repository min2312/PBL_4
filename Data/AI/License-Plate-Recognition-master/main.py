import cv2
import numpy as np
import urllib.request
from src.lp_recognition import E2E
import websocket

url = 'http://192.168.43.70/cam-hi.jpg'
model = E2E()

# Kết nối đến WebSocket của ESP8266
ws = websocket.create_connection("ws://192.168.43.110:81")  # Địa chỉ IP của ESP8266

previous_plate = ""
count = 0
required_count = 5 

while True:
    img_resp = urllib.request.urlopen(url)
    imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    frame = cv2.imdecode(imgnp, -1)

    if frame is None:
        print("Không thể nhận khung hình")
        continue

    frame = cv2.resize(frame, (640, 480))
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result_image = model.predict(frame)

    if result_image is None:
        print("No objects detected")
        previous_plate = ""
    else:
        license_plate = model.format()  # Nhận diện biển số xe

        if license_plate:
            print(f"Biển số xe: {license_plate}")
            if license_plate == previous_plate:
                count += 1
            else:
                previous_plate = license_plate
                count = 1

            if count == required_count:
                print(f"Gửi biển số xe: {license_plate} qua ESP8266")
                ws.send(license_plate)  # Gửi biển số qua WebSocket
                count = 0
        else:
            print("Không nhận diện được ký tự biển số")
            previous_plate = ""
            count = 0

    cv2.imshow('License Plate', result_image)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
ws.close()
