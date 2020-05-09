import React, { useState, useEffect } from "react";
import NavTag from "../../components/NavBar/NavTag";
import PostApi from "../../api/UserPosts";
import "./HomePage.module.css";
import CardLoader from "../../components/Loader/CardLoader";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
const HomePage = ({ match }) => {
  const { category } = match.params;
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fetchPosts = async () => {
    try {
      const data = await PostApi.findAll(currentPage, itemsPerPage, category);
      setPost(data["hydra:member"]);
      setTotal(data["hydra:totalItems"]);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, [currentPage, category]);

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
                    <strong className="d-inline-block mb-2 text-success">
                      {post.postKind.name}
                    </strong>
                    <h3 className="mb-0">{post.title}</h3>
                    <div className="mb-1 text-muted date">Nov 12</div>
                    <p className="card-text mb-auto">
                      {post.content.substring(0, 99) + "..."}
                    </p>
                    <Link
                      to={"/posts/show/" + post.slug}
                      className="stretched-link"
                    >
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
            {itemsPerPage < total && (
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={total}
                onPageChange={handlePageChange}
              />
            )}
          </React.Fragment>
        )}
      </div>
      {loading && (
        <React.Fragment>
          <div className="row">
            <div className="col-md-6">
              <CardLoader />
            </div>
            <div className="col-md-6">
              <CardLoader />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomePage;
