import React from "react";
import {TextField} from "@material-ui/core";
import PropTypes from "prop-types";

const SearchBox = ({value, setSearchValues}) => {
    return (
        <div>
            <TextField
                value={value}
                variant="outlined"
                fullWidth
                onChange={(event) => setSearchValues(event.target.value)}
                placeholder="Type to search..."
            ></TextField>
        </div>
    );
};

export default SearchBox;

SearchBox.propTypes = {
    value: PropTypes.string,
    setSearchValues: PropTypes.func,
};
