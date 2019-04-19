import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
  }

class App extends Component {
  render() {
    return (
        <div className="App">
          <Navigation/>
          <Logo />
          <Rank />
          <ImageLinkForm />
      </div>
    );
  }
}

export default App;
