import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'a5dc4862ff0a4ebb81f459678523d02e'
 });



const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => { 
    this.setState({input: event.target.value});
  }

  onButtonSubmit = (event)=> {
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
    );
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={{particlesOptions}}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
