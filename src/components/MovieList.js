import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
}));

const MovieList = ({movies, loading, genres}) => {
    const classes = useStyles();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={classes.root}>
            <ImageList className={classes.imageList} rowHeight="300">
                {movies.map((item) => (
                    <ImageListItem>
                        <img
                            src={
                                item.poster_path
                                    ? "https://image.tmdb.org/t/p/w200" +
                                      item.poster_path
                                    : "https://i.pinimg.com/736x/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg"
                            }
                            alt={item.title}
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={
                                <div>
                                    <span>
                                        {item.release_date &&
                                            item.release_date.slice(0, 4)}
                                    </span>
                                    <p>
                                        {genres.map((genre) => {
                                            for (let genre_id of item.genre_ids) {
                                                if (genre.id === genre_id) {
                                                    return genre.name + " ";
                                                }
                                            }
                                            return " ";
                                        })}
                                    </p>
                                </div>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default MovieList;

MovieList.propTypes = {
    movies: PropTypes.array,
    loading: PropTypes.bool,
    genres: PropTypes.array,
};
