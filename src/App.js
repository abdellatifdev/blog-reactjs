import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
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
import PageNotFound from './pages/NotFound/PageNotFound';

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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage}/>
              <PrivateRoute exact path="/posts/:id" component={UserPost} />
              <PrivateRoute exact path="/posts" component={UserPosts} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
