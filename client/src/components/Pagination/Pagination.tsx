import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: any;
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          className={styles.button}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.button} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className={styles.button}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
