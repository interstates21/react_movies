import "./App.css";

import React, {useState, useEffect} from "react";
import MovieList from "./components/MovieList";
import MovieListHead from "./components/MovieListHead";
import SearchBox from "./components/SearchBox";
import PaginationList from "./components/PaginationList";
import {Grid, Button} from "@material-ui/core";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValues] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(10);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getMovieRequest = async (searchValue) => {
            setLoading(true);
            const url = `https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=${searchValue}`;
            const response = await fetch(url);
            const responseJson = await response.json();

            if (responseJson.results) {
                setMovies(responseJson.results);
                for (let i = 2; i <= 10; i++) {
                    let url = `https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=${searchValue}&page=${i}`;
                    let response = await fetch(url);
                    let responseJson = await response.json();
                    setMovies((old) => [...old, ...responseJson.results]);
                }
                // setMovies(
                //     movies.sort(
                //         (a, b) =>
                //             new Date(b.release_date) - new Date(a.release_date)
                //     )
                // );
            }
            setLoading(false);
        };
        getMovieRequest(searchValue);
    }, [searchValue]);

    //get genres

    useEffect(() => {
        const getGenresRequest = async () => {
            const url =
                "https://api.themoviedb.org/3/genre/movie/list?api_key=d18619df5c6ddee814967b5e4abec16b";
            const response = await fetch(url);
            const responseJson = await response.json();

            if (responseJson.genres) {
                setGenres(responseJson.genres);
            }
        };

        getGenresRequest();
    }, []);

    //Get current movies

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={6}
        >
            <Grid item>
                <MovieListHead heading="Movies Search" />
                <SearchBox
                    searchValue={searchValue}
                    setSearchValues={setSearchValues}
                />
            </Grid>
            <Grid item>
                <MovieList
                    movies={currentMovies}
                    loading={loading}
                    genres={genres}
                />
            </Grid>
            <Grid item>
                <Button
                    onClick={
                        currentPage > 1 ? () => paginate(currentPage - 1) : null
                    }
                >
                    Prev
                </Button>
                <PaginationList
                    moviesPerPage={moviesPerPage}
                    totalMovies={movies.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <Button
                    onClick={
                        currentPage < movies.length / moviesPerPage
                            ? () => paginate(currentPage + 1)
                            : null
                    }
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default App;
