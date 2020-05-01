import React, { useState, useEffect } from "react";
import "./UserPosts.module.css";
import PostsApi from "../../api/UserPosts";
import Pagination from "../../components/pagination";

const UserPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [search,setSearch] = useState("");
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
    setCurrentPage(page)
  }

  const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value);
    handlePageChange(1);
  }

  const filteredItems = posts.filter(
    post => post.title.toLowerCase().includes(search.toLowerCase())
  )

  

  const paginatedItems = Pagination.getData(currentPage,filteredItems,itemsPerPage);
  return (
    <div className="posts-list">
      <h2>My posts list</h2>
      <div className="search">
            <input type="text" placeholder="Search by title" 
                    className="form-control" value={search} onChange={handleSearch}/>
            <select name="" id=""  className="form-control" onChange={() => console.log('hhh')}>
                  <option value="">test</option><option value="">test</option>
            </select>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Pulished</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>
                {post.updatedAt &&
                  new Date(post.updatedAt).toLocaleDateString()}
              </td>
              <td>
                {(post.isPulished && (
                  <span className="badge badge-pill badge-success">Yes</span>
                )) || <span className="badge badge-pill badge-danger">No</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage < filteredItems.length && 
           <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredItems.length}
           onPageChange={handlePageChange} />
      }
    
     
    </div>
  );
};

export default UserPosts;
