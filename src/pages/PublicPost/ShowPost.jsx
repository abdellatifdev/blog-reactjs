import React, { useState, useEffect } from "react";
import NavTag from "../../components/NavBar/NavTag";
import "./ShowPost.module.css";
import PostApi from "../../api/UserPosts";
import Article from "../../components/Loader/ShowPostLoader";
import PageNotFound from "../NotFound/PageNotFound";
const ShowPost = ({ match }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    createdAt: "",
  });

  const fetchPost = async (id) => {
    try {
      const data = await PostApi.find(id);
      const { title, content, author, createdAt } = data;
      setPost({ title, content, author, createdAt });
      setLoading(false);
    } catch (error) {
        setNotFound(true)
    }
  };
  useEffect(() => {
    fetchPost(id);
  }, [id]);

  return (
    <React.Fragment>
      {(notFound && <PageNotFound />) || (
        <React.Fragment>
          <NavTag />
          {!loading && (
            <div className="show-post">
              <h1 onClick={() => console.log(post)}>{post.title}</h1>
              <ul className="post-detail">
                <li>
                  <i className="fa fa-user"></i>
                  <span className="author">
                    {post.author.firstName + " " + post.author.lastName}
                  </span>
                </li>
                <li>
                  <i className="fa fa-calendar"></i>
                  <span className="author">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </li>
              </ul>
              <hr />
              <p className="post-content">{post.content}</p>
            </div>
          )}
          {loading && <Article />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ShowPost;
