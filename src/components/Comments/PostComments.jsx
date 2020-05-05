import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import "./Comments.module.css";
import CommentApi from "../../api/PostComments";

const PostComments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [error,setError] = useState("")
  const [comment, setComment] = useState({
    content: "",
    post: "/api/posts/199",
  });
  const fetchComments = async () => {
    try {
      const data = await CommentApi.getComments(post);
      setComments(data["hydra:member"]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console;
      await CommentApi.newComment(comment);
      fetchComments();
      setError("");
      comment.content = "";
      document.getElementById("post-comment").reset();
    } catch ({response}) {
      const {violations} = response.data;
      if(violations){
        setError("This value should not be blank.");
      }
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setComment({ ...comment, [name]: value });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="comment-wrapper">
          <div className="panel panel-info">
            <div className="panel-body">
              <form onSubmit={handleSubmit} id="post-comment">
                <div className="form-group">
                  <textarea
                    name="content"
                    value={comment.value}
                    className={"form-control" + (error && " is-invalid")}
                    placeholder="write a comment..."
                    rows="3"
                    onChange={handleChange}
                  ></textarea>
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <br />
                <button type="submit" className="btn btn-info pull-right">
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
                      <strong className="text-success">@MartinoMont</strong>
                      <p>{comment.content}</p>
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
