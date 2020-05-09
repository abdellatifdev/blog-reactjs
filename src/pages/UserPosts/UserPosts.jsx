import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostsApi from "../../api/UserPosts";
import Field from "../../components/form/Field";
import Pagination from "../../components/pagination";
import "./UserPosts.module.css";
import TableLoader from "../../components/Loader/TableLoader";

const UserPosts = (props) => {
  const [loading,setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [total,setTotal] = useState(0);  
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const data = await PostsApi.findUserPost(currentPage,search);
      setPosts(data['hydra:member']);
      setTotal(data['hydra:totalItems']);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0)
  }, [search,currentPage]);

  const itemsPerPage = 10;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ currentTarget }) => {
   // const { name, value } = currentTarget;
    setSearch(currentTarget.value);
    //   console.log({...search})
    handlePageChange(1);
  };

  const handleDelete = async (id) => {
    const originalPosts = [posts];
    setPosts(posts.filter((post) => post.id != id));
    try {
      await PostsApi.deletePost(id);
    } catch (error) {
      setPosts(originalPosts);
      console.log(error);
    }
  };

  // const filteredItems = posts.filter(
  //   (post) => post.title.toLowerCase().includes(search.toLowerCase())
  //   //       search.status == post.isPulished
  // );

  // const paginatedItems = Pagination.getData(
  //   currentPage,
  //   filteredItems,
  //   itemsPerPage
  // );
  return (
    <div className="posts-list">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>My posts list</h1>
        <Link className="btn btn-primary" to="/my-posts/new">
          New post
        </Link>
      </div>

      <Field
        type="text"
        placeholder="Search by title"
        className="form-control"
        name="title"
        value={search}
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
            <th scope="col">Published</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
          {posts.map((post) => (
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
              <td>
                <Link
                  to={"/posts/" + post.id}
                  className="btn btn-warning btn-sm"
                >
                  <i className="fa fa-edit"></i>
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    window.confirm("test") && handleDelete(post.id)
                  }
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        )}
        {loading && <TableLoader />}
      </table>
      {itemsPerPage < total && ( 
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={total}
          onPageChange={handlePageChange}
        />
       )}
    </div>
  );
};

export default UserPosts;








// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import PostsApi from "../../api/UserPosts";
// import Field from "../../components/form/Field";
// import Pagination from "../../components/pagination";
// import "./UserPosts.module.css";
// import TableLoader from "../../components/Loader/TableLoader";

// const UserPosts = (props) => {
//   const [loading,setLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState({
//     title: "",
//     status: [true, false],
//   });
//   const fetchPosts = async () => {
//     try {
//       const data = await PostsApi.findUserPost();
//       setPosts(data);
//       setLoading(false);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const itemsPerPage = 10;
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearch = ({ currentTarget }) => {
//     const { name, value } = currentTarget;
//     setSearch({ ...search, [name]: value });
//     //   console.log({...search})
//     handlePageChange(1);
//   };

//   const handleDelete = async (id) => {
//     const originalPosts = [posts];
//     setPosts(posts.filter((post) => post.id != id));
//     try {
//       await PostsApi.deletePost(id);
//     } catch (error) {
//       setPosts(originalPosts);
//       console.log(error);
//     }
//   };

//   const filteredItems = posts.filter(
//     (post) => post.title.toLowerCase().includes(search.title.toLowerCase())
//     //       search.status == post.isPulished
//   );

//   const paginatedItems = Pagination.getData(
//     currentPage,
//     filteredItems,
//     itemsPerPage
//   );
//   return (
//     <div className="posts-list">
//       <div className="mb-3 d-flex justify-content-between align-items-center">
//         <h1>My posts list</h1>
//         <Link className="btn btn-primary" to="/posts/new">
//           New post
//         </Link>
//       </div>

//       <Field
//         type="text"
//         placeholder="Search by title"
//         className="form-control"
//         name="title"
//         value={search.title}
//         onChange={handleSearch}
//       />
//       {/* <input
//           type="text"
//           placeholder="Search by title"
//           className="form-control"
//           name="title"
//           value={search.title}
//           onChange={handleSearch}
//         /> */}
//       {/* <select className="form-control" name="status" value={search.isPulished} onChange={handleSearch}>
//                   <option value='p'>Is pulished</option>
//                   <option value="1">Yes</option>
//                   <option value="0">No</option>
//             </select> */}

//       <table className="table table-hover">
//         <thead>
//           <tr>
//             <th scope="col">Title</th>
//             {/* <th scope="col">Created At</th>
//             <th scope="col">Updated At</th> */}
//             <th scope="col">Published</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         {!loading && (
//           <tbody>
//           {paginatedItems.map((post) => (
//             <tr key={post.id}>
//               <td>{post.title}</td>
//               {/* <td>{new Date(post.createdAt).toLocaleDateString()}</td>
//               <td>
//                 {post.updatedAt &&
//                   new Date(post.updatedAt).toLocaleDateString()}
//               </td> */}
//               <td>
//                 {(post.isPulished && (
//                   <span className="badge badge-pill badge-success">Yes</span>
//                 )) || <span className="badge badge-pill badge-danger">No</span>}
//               </td>
//               <td>
//                 <Link
//                   to={"/posts/" + post.id}
//                   className="btn btn-warning btn-sm"
//                 >
//                   <i className="fa fa-edit"></i>
//                 </Link>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() =>
//                     window.confirm("test") && handleDelete(post.id)
//                   }
//                 >
//                   <i className="fa fa-trash"></i>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         )}
//         {loading && <TableLoader />}
//       </table>
//       {itemsPerPage < filteredItems.length && (
//         <Pagination
//           currentPage={currentPage}
//           itemsPerPage={itemsPerPage}
//           length={filteredItems.length}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// };

// export default UserPosts;
