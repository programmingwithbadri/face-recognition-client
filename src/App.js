import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'; 

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
      console.log('clicked');
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
