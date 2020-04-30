import React, { useState, useEffect } from "react";
import "./UserPosts.module.css";
import PostsApi from '../../api/UserPosts';

const UserPosts = props => {

  const [posts,setPosts] = useState([]);

  const fetchPosts = async () => {
    try{
        const data = await PostsApi.getPosts();
        setPosts(data);
    }catch(error){

    }   
  }

  useEffect (() => {
      fetchPosts()
  },[])
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
            {posts.map(post => (
              <tr>
                  <td>{post.title}</td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPosts;
