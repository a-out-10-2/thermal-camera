import React, { Component } from 'react';



class ShowSearch extends Component {

  
    render() {
        return (
          <section>
            <h2>Search Results:</h2>
              { this.props.searchResults.map( (image, index) => 
                <div key={index}>
                  <img alt='' src={image.path}/>
                  <p>Date: {image.date}</p>
                  <p>Time: {image.time}</p>
                </div>
                ) }
          </section>
        );
      }
    }

export default ShowSearch;