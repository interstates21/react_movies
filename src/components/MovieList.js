import React, {useState} from "react";

const MovieList = ({movies, loading, genres}) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    {/* <p>{movie.release_date.slice(0, 4)}</p> */}
                    <p>{movie.release_date}</p>
                    <div>
                        {genres.map((genre) => {
                            for (let genre_id of movie.genre_ids) {
                                if (genre.id === genre_id) {
                                    return genre.name + " ";
                                }
                            }
                        })}
                    </div>
                    {/* <img
                            src={
                                "https://image.tmdb.org/t/p/w200" +
                                movie.poster_path
                            }
                            alt={movie.title}
                        ></img> */}
                </div>
            ))}
        </>
    );
};

export default MovieList;
