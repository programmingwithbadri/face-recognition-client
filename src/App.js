import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'; 
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'c4a6d17b099f4ae09a4488790df241d2'
})
const particlesOptions = {
  particles: {
    number:{
      value: 200,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: ''
    };

    this.onInputChange = (event) =>{
      console.log(event.target.value);
    }

    this.onButtonSubmit = () => {
      app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
    }
  }
  render() {
    return (
        <div className="App">
        <Particles className="particles" params ={particlesOptions} />
          <Navigation/>
          <Logo />
          <Rank />
          <ImageLinkForm onButtonSubmit = {this.onButtonSubmit} onInputChange = {this.onInputChange}/>
      </div>
    );
  }
}

export default App;
