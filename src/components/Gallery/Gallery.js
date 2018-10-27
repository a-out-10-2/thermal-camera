import React, { Component } from 'react';
import axios from 'axios';



class Gallery extends Component {

  
    render() {
        return (
          <section>
            <h2>Your Thermal Images</h2>
            <ul>
              { this.props.list.map( (image, index) => 
                  <li key={index}>The {creature.name} originates in {creature.origin}.</li>
                ) }
            </ul>
          </section>
        );
      }
    }

export default Gallery;
