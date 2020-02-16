import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import { Profile } from './components/Profile';
import Modal from './components/Modal/Modal';

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');

    // IF any token there in the browser storage,
    // instead of loading the signin page we could call the signin URL from the home
    // and check the token is valid one and signin the user
    if (token) {
      fetch("https://sleepy-castle-79381.herokuapp.com/signin", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': token
        }
      }).then(response => response.json())
        .then(data => {
          if (data && data.id) {
            // Once we got authorized user ID, then we will fetch the user profile
            fetch(`https://sleepy-castle-79381.herokuapp.com/profiles/${data.id}`, {
              method: 'get',
              headers: {
                'content-type': 'application/json',
                'authorization': token
              }
            }).then(response => response.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange('home');
                }
              })
          }
        })
        .catch(err => console.log(err))
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://sleepy-castle-79381.herokuapp.com/imageUrl", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://sleepy-castle-79381.herokuapp.com/entries", {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'authorization': window.localStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
          this.displayFaceBoxes(this.calculateFaceLocations(response))
        }
      }
      )
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      })
    }
  }

  displayFaceBoxes = (boxes) => {
    if (boxes) {
      this.setState({ boxes: boxes });
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render() {
    const { route, boxes, imageUrl, isSignedIn, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
        {isProfileOpen &&
          <Modal>
            <Profile user={user} toggleModal={this.toggleModal} loadUser={this.loadUser} />
          </Modal>
        }
        {
          route === 'home'
            ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries} />
              <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
            : (route === 'signIn'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;