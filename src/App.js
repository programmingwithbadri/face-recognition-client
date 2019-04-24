import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank'; 
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'f999fcc4060e40fca878946330b0da34'
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
        input: '',
        imageUrl: '',
        box: {}
      };
    }
    onInputChange = (event) =>{
      this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response)
      );
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);}
      )
      .catch(err => console.log(err))
    }

    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(height, width);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }

    displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box});
    }

  render() {
    return (
        <div className="App">
        <Particles className="particles" params ={particlesOptions} />
          <Navigation/>
          <Logo />
          <Rank />
          <ImageLinkForm onButtonSubmit = {this.onButtonSubmit} onInputChange = {this.onInputChange}/>
          <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
