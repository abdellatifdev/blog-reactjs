import React from "react";

const Pagination = ({currentPage,itemsPerPage,length,onPageChange}) => {
    
    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for(let i = 1; i <= pagesCount; i++){
      pages.push(i);
    }
     
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={"page-item" + (currentPage === 1 && " disabled")}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={"page-item" + (page === currentPage && " active")}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={"page-item" + (currentPage === pagesCount && " disabled")}
        >
          <button
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
Pagination.getData = (currentPage,items,itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start,start + itemsPerPage);
}

export default Pagination;
