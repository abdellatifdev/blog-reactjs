import React from "react";
import { Link } from "react-router-dom";
import './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className="error-template">
      <h1>Oops!</h1>
      <h2>404 Not Found</h2>
      <div className="error-details">
        Sorry, an error has occured, Requested page not found!
      </div>
      <div className="error-actions">
        <Link to="/" className="btn btn-primary btn-lg">
          <span className="fa fa-home"></span>
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
