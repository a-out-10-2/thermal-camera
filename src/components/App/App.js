import React, { Component } from 'react';
import thermal from './thermal.jpg';
import './App.css';
import axios from 'axios';
// import Gallery from '../Gallery/Gallery'



class App extends Component {

  state = {
    // this is just to show us the different data we are using on our images
    newImage: {
      path: '',
      date: '',
      time: ''
    },
    // array for client side storage
    imageList: [ ],
  }


  //GET request to retrieve images
  getImages = () => {
    axios({
      method: 'GET',
      url: '/images'
    })
    .then( (response) => {
      console.log('GET response was', response.data );
      // Put the response into state, so that we will trigger render() 
      this.setState({
        imageList: response.data 
      })
    })
    .catch( (error) => {
      alert('Error on GET request for images', error);
    })
  } // end getImages


  // This triggers getImages at the first render of the DOM
  componentDidMount() {
    console.log('About to get images');
    this.getImages();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Low Cost Thermal Camera
          </p>
          <img src={thermal} className="App-logo" alt="logo" />
        </header>
        {/* <Gallery list={this.state.imageList}/> */}
      </div>
    );
  }
}

export default App;
