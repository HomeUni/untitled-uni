import React from 'react';

const Pagination = ({
  currentPage,
  coursesPerPage,
  totalCourses,
  handlePaginationClick
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul>
      {pageNumbers.map((number) => (
        <li key={number}>
          <button onClick={() => handlePaginationClick(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
