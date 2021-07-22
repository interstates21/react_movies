import React from "react";
import {Button} from "@material-ui/core";

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
