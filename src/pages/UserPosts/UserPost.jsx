import React, { useState, useEffect } from "react";
import Field from "../../components/form/Field";
import ApiPost from "../../api/UserPosts";
import PageNotFound from "../NotFound/PageNotFound";
import jwtDecode from "jwt-decode";
import PostKindApi from "../../api/PostKindApi";

const UserPost = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [post, setPost] = useState({
    title: "",
    content: "",
    postKind: "",
    isPulished: false,
  });
  const [kinds, setKinds] = useState([]);
  const [error, setError] = useState({
    title: "",
    content: "",
    postKind: ""
  });
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchPostKinds = async () => {
    try {
      const data = await PostKindApi.findAll();
      setKinds(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchPost = async (idUser) => {
    try {
      const data = await ApiPost.find(idUser);
      
      const { id } = jwtDecode(window.localStorage.getItem("authToken"));
      if (data["author"]["id"] !== id) {
        setNotFound(true);
      } else {
        const { title, content, isPulished, slug,postKind} = data;
        setPost({ title, content, isPulished, slug,postKind: postKind.id });
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

  useEffect(() => {
    fetchPostKinds();
  }, []);

  const handleChange = ({ currentTarget }) => {
    const { name, value, checked } = currentTarget;
    setPost({ ...post, [name]: (name !== "isPulished" && value) || checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!editing) {
        await ApiPost.newPost({
          ...post, 
          postKind: `/api/post_kinds/${post.postKind}`
        });
      } else {
        await ApiPost.edit(id, {
          ...post,
          postKind: `/api/post_kinds/${post.postKind}`
        });
      }

      history.replace("/my-posts");
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
      {(!notFound && (
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
            <div className="form-group">
              <label>Post kind</label>
              <select 
                className={"form-control " + (error.postKind && "is-invalid")}
                value={post.postKind}
                name="postKind"
                onChange={handleChange}
                >
                {kinds.map((kind) => (
                    <option key={kind.id} value={kind.id}>{kind.name}</option>
                ))}               
              </select>
              {error.postKind && (
                <div className="invalid-feedback">{error.postKind}</div>
              )}
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="isPulished"
                onChange={handleChange}
                checked={post.isPulished}
                id="isPublished"
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
      )) || <PageNotFound />}
    </React.Fragment>
  );
};

export default UserPost;
