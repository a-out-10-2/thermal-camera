import React, { Component } from 'react';



class Gallery extends Component {
  
  heatMapColorforValue(value){
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
  }

  componentDidUpdate() {
    for(let i = 0; i < this.props.list.length; i++) {
      let images = this.props.list[i];
      let image = this.props.list[i];
      let ref = `canvas${i}`;
      console.log(ref);
      console.log('images:', images);
      console.log('images.datetime:', images.datetime);

      let ctx = this.refs[ref].getContext('2d');
      let m = 10;
      //let ctx = c.getContext("2d");
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
          let cTemp = image.data[y][x];
          //console.log(cTemp);
          let value = (cTemp - min) / range;
          ctx.fillStyle = this.heatMapColorforValue(value);
          ctx.fillRect( x*m, y*m, m, m );
        }
      }
    }
  } // end componentDidUpdate
  
  render() {
    return (
      <section>
        <h2>Your Thermal Images</h2>
          { this.props.list.map( (image, index) => 
            <div key={index}>
              {/* how do I add .toLocaleDateString() to the date below? */}
              <p>Date/Time: {image.datetime}</p>
              <canvas ref={'canvas'+index} width="320" height="240"></canvas>
            </div>
            ) }
      </section>
    );
  }
}

export default Gallery;
