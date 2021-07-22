import React from "react";
import {TextField} from "@material-ui/core";

const SearchBox = (props) => {
    return (
        <div>
            <TextField
                value={props.value}
                variant="outlined"
                fullWidth
                onChange={(event) => props.setSearchValues(event.target.value)}
                placeholder="Type to search..."
            ></TextField>
        </div>
    );
};

export default SearchBox;
