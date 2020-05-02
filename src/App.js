import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Auth from './api/Auth';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/Login';
import UserPosts from './pages/UserPosts/UserPosts';
import UserPost from './pages/UserPosts/UserPost';

Auth.setup();

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(Auth.isAuthenticated());

  const NavBarWithRouter = withRouter(NavBar);

  return (
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <NavBarWithRouter />
            <Switch>
              <Route path="/login" component={LoginPage}/>
              <PrivateRoute path="/posts/:id" component={UserPost} />
              <PrivateRoute path="/posts" component={UserPosts} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
