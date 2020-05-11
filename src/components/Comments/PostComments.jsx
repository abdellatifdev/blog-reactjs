import React, { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import "./Comments.module.css";
import CommentApi from "../../api/PostComments";
import AuthContext from "../../contexts/AuthContext";
import jwtDecode from "jwt-decode";

const PostComments = ({ history, post }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState({
    content: "",
    post: "",
  });
  const fetchComments = async () => {
    try {
      const data = await CommentApi.getComments(post);
      setComments(data["hydra:member"]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!editing) {
        await CommentApi.newComment({
          ...comment,
          post: `/api/posts/${post}`,
        });
      } else {
        await CommentApi.edit(comment.id, { ...comment });
      }
      fetchComments();
      setError("");
      setComment({ id: undefined, post: "", content: "" });
      setEditing(false);
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        setError("This value should not be blank.");
      }
    }
  };

  const checkIfIsAuthenticated = () => {
    if (!isAuthenticated) {
      if (window.confirm("Create an account to write a response.")) {
        history.replace("/login");
      }
    }
  };

  const handleEdit = async (idComment) => {
    try {
      const data = await CommentApi.find(idComment);
      const { id, content, post } = data;
      setComment({ id, content, post });
      setEditing(true);
      document.getElementById("comment-wrapper").scrollIntoView();
    } catch ({ response }) {
      console.log(response);
    }
  };

  const checkIfCommentAuthor = (comment) => {
    if (isAuthenticated) {
      const { id } = jwtDecode(window.localStorage.getItem("authToken"));
      if (id === comment.author.id) {
        return true;
      }
    }
    return false;
  };

  const handleDelete = async (id) => {
    const originalComments = [comments];
    setComments(comments.filter((comment) => comment.id != id));
    try {
      await CommentApi.deleteComment(id);
    } catch ({ response }) {
      setComments(originalComments);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="comment-wrapper" id="comment-wrapper">
          <div className="panel panel-info">
            <div className="panel-body">
              <form onSubmit={handleSubmit} id="post-comment">
                <div className="form-group">
                  <textarea
                    id="content"
                    name="content"
                    value={comment.content}
                    className={"form-control" + (error && " is-invalid")}
                    placeholder="write a comment..."
                    rows="3"
                    onChange={handleChange}
                    onClick={checkIfIsAuthenticated}
                  ></textarea>
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-info pull-right"
                  disabled={!isAuthenticated && "disabled"}
                >
                  Post
                </button>
              </form>
              <div className="clearfix"></div>
              <hr />
              <ul className="media-list">
                {comments.map((comment) => (
                  <li className="media" key={comment.id}>
                    <a href="#" className="pull-left">
                      <img
                        src="https://bootdey.com/img/Content/user_1.jpg"
                        alt=""
                        className="img-circle"
                      />
                    </a>
                    <div className="media-body">
                      <span className="text-muted pull-right">
                        <small className="text-muted">
                          {format(comment.createdAt, "my-locale")}
                        </small>
                      </span>
                      <strong className="text-success">
                        {comment.author.firstName +
                          " " +
                          comment.author.lastName}
                      </strong>
                      <p>{comment.content}</p>
                      {checkIfCommentAuthor(comment) && (
                        <React.Fragment>
                          <button
                            className="delete-comment"
                            onClick={() => handleEdit(comment.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-comment"
                            onClick={() =>
                              window.confirm("Are you sure ?") &&
                              handleDelete(comment.id)
                            }
                          >
                            Delete
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
