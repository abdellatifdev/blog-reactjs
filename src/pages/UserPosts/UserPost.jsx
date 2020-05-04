import React, { useState, useEffect } from "react";
import Field from "../../components/form/Field";
import ApiPost from "../../api/UserPosts";
import PageNotFound from "../NotFound/PageNotFound";
import jwtDecode from 'jwt-decode';

const UserPost = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [post, setPost] = useState({
    title: "",
    content: "",
    isPulished: false,
    slug: "",
  });
  const [error, setError] = useState({
    title: "",
    content: "",
    slug: "",
  });
  const [notFound,setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchPost = async (idUser) => {
    try {
      const data = await ApiPost.find(idUser);
      const {id} = jwtDecode(window.localStorage.getItem("authToken"));
      if(data['author']['id'] !== id){
          setNotFound(true);
      }else{
        const { title, content, isPulished, slug } = data;
        setPost({ title, content, isPulished, slug });
      }
    } catch (error) {
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchPost(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value, checked } = currentTarget;
    setPost({ ...post, [name]: (name !== "isPulished" && value) || checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!editing) {
        await ApiPost.newPost(post);
      } else {
        await ApiPost.edit(id, post);
      }

      history.replace("/posts");
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setError(apiErrors);
      }
    }
  };

  return (
    <React.Fragment>
        {!notFound && (
            <div className="posts-list">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              {(!editing && <h2>Create new post</h2>) || (
                <React.Fragment>
                  <h2>Editing {post.title}</h2>
                  {/* <button className="btn btn-primary" onClick={() => handleDelete(post.id)}>
                    Delete post
                  </button> */}
                </React.Fragment>
              )}
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
                error={error.title}
              />
              <div className="form-group">
                <label>Body</label>
                <textarea
                  name="content"
                  rows="5"
                  className={"form-control " + (error.content && "is-invalid")}
                  value={post.content}
                  placeholder="Body"
                  onChange={handleChange}
                ></textarea>
                {error.content && (
                  <div className="invalid-feedback">{error.content}</div>
                )}
              </div>
              <Field
                label="Slug"
                type="text"
                placeholder="Slug"
                className="form-control"
                name="slug"
                value={post.slug}
                onChange={handleChange}
                error={error.slug}
              />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isPulished"
                  onChange={handleChange}
                  checked={post.isPulished}
                />
                <label className="form-check-label" htmlFor="isPublished">
                  Published
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        ) || (<PageNotFound />)}
    </React.Fragment>
    
  );
};

export default UserPost;
