import React, { Component } from 'react';



class Gallery extends Component {

  let c = document.getElementById("myCanvas");
  let m = 10;
  let ctx = c.getContext("2d");
  let min = 27;
  let max = 35;
  let range = max - min;
  // For example...
  // 10 - 32
  // if we have '20'
  // 20 - 10, 10 / 22
  // 10 - 10, 0 / 22
  // 32 - 10, 22 / 22

  for( let x = 0; x < 32; x++) {
    for( let y = 0; y < 24; y++) {
      // Value of item at that datapoint
      let cTemp = Math.random() * 30 + 10;
      let value = (cTemp - min) / range;
      ctx.fillStyle = heatMapColorforValue(value);
      ctx.fillRect( x*m, y*m, m, m );
    }
  }

  function heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
  }

  
  render() {
    return (
      <section>
        <h2>Your Thermal Images</h2>
          { this.props.list.map( (image, index) => 
            <div key={index}>
              <canvas width="500" height="500"></canvas>
              <img alt='' src={image.path}/>
              <p>Date: {image.date}</p>
              <p>Time: {image.time}</p>
            </div>
            ) }
      </section>
    );
  }
}

export default Gallery;
