#!/usr/bin/python
# IoT Hack Day 2018
# author: Andy Moe (moe.andrew@gmail.com)


# Thermal device (32 x 24)
import sys
sys.path.insert(0, "./build/lib.linux-armv7l-2.7")
import MLX90640 as thermaldev

DEVICE_FPS = 8
PIX_WIDTH = 24
PIX_HEIGHT = 32
OUT_PIX_WIDTH = 240
OUT_PIX_HEIGHT = 320

# Display device (320 x 240)
import pygame
import os
DISPLAY_WIDTH = 240
DISPLAY_HEIGHT = 320

# Button device 
import threading
import RPi.GPIO as GPIO

# Main Program 
import time
import colorsys
from PIL import Image
import requests
import datetime

WEBSERVER_URL = "http://192.168.56.36:5000/images"
SLEEPTIME = 0.01

global send_image
send_image = False  # If True, image will be send to webserver

"""
# Button listener for saving or sending thermal images
class ButtonListener(threading.Thread):

    def __init__(self, thread_id):
        super(ButtonListener, self).__init__()
        self.thread_id = thread_id
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    def run(self):

        previous_button_state = True
        while True:
            current_button_state = GPIO.input(22)

            if current_button_state != previous_button_state and current_button_state == False:
                print("] <- Button pressed".format(self.thread_id))
                send_image = True

            previous_button_state = current_button_state
            time.sleep(.1)
"""


# Initialize the display and return pygame.Surface object
def __init_display():
    os.putenv('SDL_FBDEV', '/dev/fb1')
    pygame.init()
    pygame.mouse.set_visible(False)
    return pygame.display.set_mode((DISPLAY_HEIGHT, DISPLAY_WIDTH))


# Write the image to the display
def __write_img_to_display(img, display):
    width, height = img.size
    #print("width={}\theight={}".format(width, height))
    for i in range(width):
        for j in range(height):
            #print("class:{}\ti:{}, j:{}".format(img.__class__, i, j))
            display.set_at((j, i), img.getpixel((i, j)))

    pygame.display.update()

#def __write_img_to_file(img):
#   filename = datetime.datetime.now().strftime("%Y%m%d%H%M%S.%f")

# Convert the PIL.Image to 2D list
#def __convert_img_to_2darray(img):
#   

# Capture the thermal data from the device and return it
def __capture_thermal_data():
    thermaldev.setup(DEVICE_FPS)
    outframe = thermaldev.get_frame()
    #print(outframe)
    thermaldev.cleanup()

    return outframe


# Get minimum and maximum value of frame
def __get_minmax(vals):
    v_min = min(*vals)
    v_max = max(*vals)
    return (v_min, v_max)


# Convert a temperature value to a color
def __temp_to_col(val):
    hue = (180 - (val * 6)) / 360.0
    return tuple([int(c*255) for c in colorsys.hsv_to_rgb(hue, 1.0, 1.0)])

def __temp_to_col2(val, min, max):
    hue = (180 - (val * 6)) / 360.0
    return tuple([int(c*255) for c in colorsys.hsv_to_rgb(hue, 1.0, 1.0)])


# Convert an array of pixel data to PIL.Image format
def __convert_frame_to_img(frame):
    img = Image.new( 'RGB', (PIX_WIDTH, PIX_HEIGHT), "black")
    #print(",".join(["{:05b}".format(x) for x in range(PIX_WIDTH)]))
    for x in range(PIX_WIDTH):
        row = []
        for y in range(PIX_HEIGHT):
            val = frame[PIX_HEIGHT * ((PIX_WIDTH - 1) - x) + y]
            row.append(val)
            img.putpixel((x, y), __temp_to_col(val))
    #print(",".join(["{:05.2f}".format(v) for v in row]))
    return img

def __convert_frame_to_img2(frame, min, max):
    img = Image.new( 'RGB', (PIX_WIDTH, PIX_HEIGHT), "black")
    #print(",".join(["{:05b}".format(x) for x in range(PIX_WIDTH)]))
    for x in range(PIX_WIDTH):
        row = []
        for y in range(PIX_HEIGHT):
            val = frame[PIX_HEIGHT * ((PIX_WIDTH - 1) - x) + y]
            row.append(val)
            img.putpixel((x, y), __temp_to_col2(val, min, max))
    #print(",".join(["{:05.2f}".format(v) for v in row]))
    return img


if __name__ == "__main__":

    #min, max = __get_minmax(frame)
    #print("min:{}\tmax:{}".format(min, max))
    #img = __convert_frame_to_img(__capture_thermal_data())
    #img = img.resize( (OUT_PIX_WIDTH, OUT_PIX_HEIGHT), Image.BICUBIC)
    #img.save("testimg.png")

    display = __init_display()
    #__write_img_to_display(img, display)
    #time.sleep(5)

    # Setup button
    #buttonthr = ButtonListener(0)
    #buttonthr.start()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    previous_button_state = True

while(True):

        current_button_state = GPIO.input(22)

        if current_button_state != previous_button_state and current_button_state == False:
            print("] <- Button pressed")
            send_image = True

        previous_button_state = current_button_state

        sys.stdout.write("** Capturing thermal data ... ")
        sys.stdout.flush()
        frame = __capture_thermal_data()
        sys.stdout.write("DONE\n")
        sys.stdout.flush()

        sys.stdout.write("** Converting data to PIL.Image ... ")
        sys.stdout.flush()
        #min, max = __get_minmax(frame)
        img = __convert_frame_to_img(frame)
        #img = __convert_frame_to_img2(frame, min, max)
        sys.stdout.write("DONE\n")
        sys.stdout.flush()

        sys.stdout.write("** Interpolating PIL.Image thermal ... ")
        sys.stdout.flush()
        img = img.resize( (OUT_PIX_WIDTH, OUT_PIX_HEIGHT), Image.BICUBIC)
        sys.stdout.write("DONE\n")
        sys.stdout.flush()

        sys.stdout.write("** Writing PIL.Image through PyGame to /dev/fb1 ... ")
        sys.stdout.flush()
        __write_img_to_display(img, display)
        sys.stdout.write("DONE\n")
        sys.stdout.flush()

        #arr2d = __convert_img_to_2darray(img)

        if send_image:
            datamap = {'data':frame}
            res = requests.post(url=WEBSERVER_URL, data=datamap)

            print("&& Post resp:\'{}\'".format(res))
            send_image = False

        # Wait N seconds until next cycle
        #time.sleep(SLEEPTIME)

    #buttonthr.join()