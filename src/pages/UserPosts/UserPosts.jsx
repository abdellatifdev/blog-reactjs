import React, { useState, useEffect } from "react";
import "./UserPosts.module.css";
import PostsApi from "../../api/UserPosts";
import Pagination from "../../components/pagination";
import Field from "../../components/form/Field";
import { Link } from "react-router-dom";

const UserPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    title: "",
    status: [true, false],
  });
  const fetchPosts = async () => {
    try {
      const data = await PostsApi.getPosts();
      setPosts(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const itemsPerPage = 10;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setSearch({ ...search, [name]: value });
    //   console.log({...search})
    handlePageChange(1);
  };

  const filteredItems = posts.filter(
    (post) => post.title.toLowerCase().includes(search.title.toLowerCase())
    //       search.status == post.isPulished
  );

  const paginatedItems = Pagination.getData(
    currentPage,
    filteredItems,
    itemsPerPage
  );
  return (
    <div className="posts-list">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>My posts list</h1>
        <Link className="btn btn-primary" to="/posts/new">
          New post
        </Link>
      </div>
      
        <Field
          type="text"
          placeholder="Search by title"
          className="form-control"
          name="title"
          value={search.title}
          onChange={handleSearch}
        />
        {/* <input
          type="text"
          placeholder="Search by title"
          className="form-control"
          name="title"
          value={search.title}
          onChange={handleSearch}
        /> */}
        {/* <select className="form-control" name="status" value={search.isPulished} onChange={handleSearch}>
                  <option value='p'>Is pulished</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
            </select> */}
      
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            {/* <th scope="col">Created At</th>
            <th scope="col">Updated At</th> */}
            <th scope="col">Pulished</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              {/* <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>
                {post.updatedAt &&
                  new Date(post.updatedAt).toLocaleDateString()}
              </td> */}
              <td>
                {(post.isPulished && (
                  <span className="badge badge-pill badge-success">Yes</span>
                )) || <span className="badge badge-pill badge-danger">No</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredItems.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredItems.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserPosts;
