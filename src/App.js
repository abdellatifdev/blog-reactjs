import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="container">
              <NavBar />
              <HomePage />
          </div>
      </div>
    );
  }
}

export default App;
