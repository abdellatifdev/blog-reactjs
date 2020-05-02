import React, { useState } from "react";
import Field from "../../components/form/Field";
import UserPosts from "../../api/UserPosts";

const UserPost = (props) => {
  const [post, setPost] = useState({
    title: "",
    content:"",
    isPublished:false,
    slug : "test-test"
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (event) =>{
      event.preventDefault(); 
      console.log(post)
      try{
           await UserPosts.newPost(post); 
      }catch(error){
           console.log(error.response) 
      }
  }

  return (
    <div className="posts-list">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2>Create new post</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <Field
          label="Title"
          type="text"
          placeholder="Title"
          className="form-control"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <div className="form-group">
          <label>Body</label>
          <textarea
            name="content"
            rows="5"
            className="form-control"
            value={post.content}
            placeholder="Body"
            onChange={handleChange}
          ></textarea>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isPublished"
              name="isPublished"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isPublished">
              Published
            </label>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPost;
