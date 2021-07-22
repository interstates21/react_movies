import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 600,
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: 2,
    },
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 224,
            width: 250,
        },
    },
};

const Genres = ({genres, showGenres}) => {
    const classes = useStyles();
    const [selectedGenre, setSelectedGenre] = React.useState([]);

    const handleChange = (event) => {
        setSelectedGenre(event.target.value);
        showGenres(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Genre</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectedGenre}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip
                                    key={value.id}
                                    label={value.name}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {genres.map((genre) => (
                        <MenuItem key={genre.name} value={genre}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Genres;

Genres.propTypes = {
    genres: PropTypes.array.isRequired,
    showGenres: PropTypes.func,
};
