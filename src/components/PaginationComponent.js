import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const NUM_SHOWN_ITEMS = 5;

const generatePaginationItems = (numPages, currentPage) => {
  let items = [currentPage];
  let left = currentPage - 1,
    right = currentPage + 1;
  while ((left >= 1 || right <= numPages) && items.length < NUM_SHOWN_ITEMS) {
    if (left >= 1) {
      items = [left--, ...items];
    }
    if (right <= numPages) {
      items.push(right++);
    }
  }

  if (items[0] > 2) {
    items = [1, "<<", ...items];
  } else if (items[0] === 2) {
    items = [1, ...items];
  }

  if (items[items.length - 1] < numPages - 1) {
    items.push(">>", numPages);
  } else if (items[items.length - 1] === numPages - 1) {
    items.push(numPages);
  }
  console.log(items);

  return items;
};

const PaginationComponent = ({ numPages, currentPage, getLinkForPage }) => {
  return (
    <Pagination size="lg">
      {generatePaginationItems(numPages, currentPage).map((p) => {
        if (p === "<<") {
          return (
            <li className="page-item">
              <Link className="page-link" to={getLinkForPage(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </Link>
            </li>
          );
        } else if (p === ">>") {
          return (
            <li className="page-item">
              <Link className="page-link" to={getLinkForPage(currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Previous</span>
              </Link>
            </li>
          );
        } else {
          return (
            <li className={"page-item" + (currentPage === p ? " active" : "")}>
              <Link className="page-link" to={getLinkForPage(p)}>
                {p}
              </Link>
            </li>
          );
        }
      })}
    </Pagination>
  );
};

export default PaginationComponent;
