import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    imageList: {
        width: "600",
        height: "1600",
    },
}));

const MovieList = ({movies, loading, genres}) => {
    const classes = useStyles();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={classes.root}>
            <ImageList className={classes.imageList}>
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
    // return (
    //     <>
    //         {movies.map((movie) => (
    //             <div>
    //                 <h3>{movie.title}</h3>
    //                 {/* <p>{movie.release_date.slice(0, 4)}</p> */}
    //                 <p>{movie.release_date}</p>
    //                 <div>
    //                     {genres.map((genre) => {
    //                         for (let genre_id of movie.genre_ids) {
    //                             if (genre.id === genre_id) {
    //                                 return genre.name + " ";
    //                             }
    //                         }
    //                     })}
    //                 </div>
    //                 {/* <img
    //                         src={
    //                             "https://image.tmdb.org/t/p/w200" +
    //                             movie.poster_path
    //                         }
    //                         alt={movie.title}
    //                     ></img> */}
    //             </div>
    //         ))}
    //     </>
    // );
};

export default MovieList;
