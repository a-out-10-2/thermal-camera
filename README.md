# Low Cost Thermal Camera

This repository includes Python code that can be run on a Raspberry PI to dispaly images from a [SparkFun IR Array (MLX90640)](https://www.sparkfun.com/products/14844) on to a [PiTFT](https://www.adafruit.com/product/2315) screen.

## PARTS

*Note: We've currently only tested this on a Pi 3 B+. We plan to test this project on a Pi Zero W in the near future.*

- Raspberry Pi 3 B+ $40
- [SparkFun IR Array (MLX90640)](https://www.sparkfun.com/products/14844) $60
- 2.2" PiTFT $25
- [3D Printed Enclosure](https://www.thingiverse.com/thing:803447)


## Web Server Feature List

### Header COMPONENT
- [x] Set up <Header /> component

### Gallery of thermal images COMPONENT
- [x] Add the <Gallery /> component on app.js
- [x] GET axios request to display images on DOM
- [x] Append the images 3 per row with timestamps under the pics

### Search Feature COMPONENT
- [ ] Searchable by date/time
- [ ] Add <Search /> to the app.js with props for GET axios request