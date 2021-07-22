import React from "react";
import PropTypes from "prop-types";

const MovieListHead = ({heading}) => {
    return (
        <div>
            <h1>{heading}</h1>
        </div>
    );
};

export default MovieListHead;

MovieListHead.propTypes = {
    heading: PropTypes.string.isRequired,
};
