import * as React from "react";

interface Props {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / pageSize);
  const pages = Array.from(Array(pageCount).keys());

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
