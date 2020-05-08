import React, { useState, useEffect, useContext } from "react";
import NavTag from "../../components/NavBar/NavTag";
import "./ShowPost.module.css";
import PostApi from "../../api/UserPosts";
import Article from "../../components/Loader/ShowPostLoader";
import PageNotFound from "../NotFound/PageNotFound";
import PostComments from "../../components/Comments/PostComments";

const ShowPost = ({ history,match }) => {
  const { slug } = match.params;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [post, setPost] = useState({
    id:"",
    title: "",
    content: "",
    author: "",
    createdAt: "",
    postKind: ""
  });
  
  const fetchPost = async (slug) => {
    try {
      const data = await PostApi.findByslug(slug);
      const { id,title, content, author, createdAt ,postKind} = data[0];
      setPost({ id,title, content, author, createdAt,postKind });
      setLoading(false);
    } catch (error) {
      setNotFound(true);
    }
  };
  useEffect(() => {
    fetchPost(slug);
  }, [slug]);

  return (
    <React.Fragment>
      {(notFound && <PageNotFound />) || (
        <React.Fragment>
          <NavTag />
          {!loading && (
            <React.Fragment>
              <div className="show-post">
                <h1>{post.title}</h1>
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
                  <li>
                      <span className="badge badge-pill badge-success">
                        {post.postKind.name}
                      </span>
                  </li>
                </ul>
                <hr />
                <p className="post-content">{post.content}</p>
              </div>
              <hr/>
              <PostComments post={post.id} history={history}/>
            </React.Fragment>
          )}
          {loading && <Article />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ShowPost;
