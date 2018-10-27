import React, { Component } from 'react';



class Gallery extends Component {
  
  render() {
    return (
      <section>
        <h2>Your Thermal Images</h2>
        <ul>
          { this.props.list.map( (image, index) => 
            <div key={index}>
              <img alt='' src={image.path}/>
              <p>Date: {image.date}</p>
              <p>Time: {image.time}</p>
            </div>
          )}
        </ul>
      </section>
    );
  }
}

export default Gallery;
