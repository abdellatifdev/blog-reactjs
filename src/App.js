import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {Switch,Route,BrowserRouter,HashRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <div className="container">
                <NavBar />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
