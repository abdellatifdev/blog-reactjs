import React, { useState } from 'react';
import {Switch,Route,BrowserRouter,HashRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login/Login';
import Auth from './api/Auth';
import LoginPage from './pages/Login/Login';

Auth.setup();

const App = () => {

    const [isAuthenticated,setIsAuthenticated] = useState(true)

    return (
      <BrowserRouter>
        <div className="App">
            <div className="container">
                <NavBar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated}/>
                <Switch>
                    <Route path="/login" render={props => <LoginPage onLogin={setIsAuthenticated}/>} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        </div>
      </BrowserRouter>
    );
}

export default App;
