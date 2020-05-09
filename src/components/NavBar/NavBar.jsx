import React ,{useContext} from "react";
import "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import Auth from "../../api/Auth";
import AuthContext from "../../contexts/AuthContext";

const NavBar = ({history }) => {
  
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext);

  const handleLogout = () => {
    Auth.logout();
    setIsAuthenticated(false);
    history.push('/');
  };

  return (
    <header className="blog-header py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1">
          {(isAuthenticated && (
            <NavLink className="text-muted" to="/my-posts">
              My posts
          </NavLink>
          ))}
        </div>
        <div className="col-4 text-center">
          <NavLink className="blog-header-logo text-dark" to="/">
            Sedrati Blog
          </NavLink>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <a className="text-muted" href="#" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mx-3"
              role="img"
              viewBox="0 0 24 24"
              focusable="false"
            >
              <title>Search</title>
              <circle cx="10.5" cy="10.5" r="7.5"></circle>
              <path d="M21 21l-5.2-5.2"></path>
            </svg>
          </a>

          {(!isAuthenticated && (
            <React.Fragment>
              <NavLink className="btn btn-sm btn-outline-secondary" to="/login">
                Sign in
              </NavLink>
              <NavLink
                className="btn btn-sm btn-outline-secondary"
                to="/register"
              >
                Sign up
              </NavLink>
            </React.Fragment>
          )) || (
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
