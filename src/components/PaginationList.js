import React from "react";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";

const PaginationList = ({
    moviesPerPage,
    totalMovies,
    paginate,
    currentPage,
}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            {pageNumbers.map((number) =>
                number === currentPage ? (
                    <Button color="secondary" onClick={() => paginate(number)}>
                        {number}
                    </Button>
                ) : (
                    <Button onClick={() => paginate(number)}>{number}</Button>
                )
            )}
        </>
    );
};

export default PaginationList;

PaginationList.propTypes = {
    moviesPerPage: PropTypes.number.isRequired,
    totalMovies: PropTypes.number,
    paginate: PropTypes.func,
    currentPage: PropTypes.number,
};
