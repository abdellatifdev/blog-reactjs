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
import ShowPost from './pages/PublicPost/ShowPost';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

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
              <Route path="/posts/category/:category" render={({match}) => <HomePage match={match} />}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={Register}/>
              <PrivateRoute exact path="/my-posts/:id" component={UserPost} />
              <Route exact path="/posts/show/:slug" component={ShowPost} />
              <PrivateRoute exact path="/my-posts" component={UserPosts} />
              <Route exact path="/profile" component={Profile} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
