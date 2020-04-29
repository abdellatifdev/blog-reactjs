import React from "react";
import "./UserPosts.module.css";

const UserPosts = () => {
  return (
    <div className="posts-list">
      <h2>My posts list</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">isPublished</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserPosts;
