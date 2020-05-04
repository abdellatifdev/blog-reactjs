import React, { useState, useEffect } from "react";
import NavTag from "../../components/NavBar/NavTag";
import PostApi from "../../api/UserPosts";
import './HomePage.module.css';
import CardLoader from "../../components/Loader/CardLoader";
import { Link } from "react-router-dom";
const HomePage = (props) => {
  const [posts, setPost] = useState([]);
  const [loading,setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const data = await PostApi.findAll();
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <NavTag />
      <div className="row mb-2">
        {!loading && (
          <React.Fragment>
              {posts.map((post) => (
          <div key={post.id} className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">
                  World
                </strong>
                <h3 className="mb-0">{post.title}</h3>
                <div className="mb-1 text-muted date">Nov 12</div>
                <p className="card-text mb-auto">
                  {post.content.substring(0,99) + "..."}
                </p>
                <Link to={"/posts/show/"+post.id} className="stretched-link">
                  Continue reading
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Thumbnail
                  </text>
                </svg>
              </div>
            </div>
          </div>
        ))}
          </React.Fragment>
        )}
        {loading && <CardLoader />}
        
      </div>
    </React.Fragment>
  );
};

export default HomePage;
