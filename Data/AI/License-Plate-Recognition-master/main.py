import cv2
import numpy as np
import urllib.request
from src.lp_recognition import E2E
import serial
url = 'http://172.20.10.5/cam-lo.jpg'

model = E2E()
ser = serial.Serial('COM5', 9600)
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
        else:
            license_plate = model.format()
            if license_plate:
                print(f"Biển số xe: {license_plate}")
                ser.write(f"{license_plate}\n".encode('utf-8'))
            else:
                print("Không nhận diện được ký tự biển số")
        cv2.imshow('License Plate', result_image)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cv2.destroyAllWindows()
