import "./App.css";

import React, {useState, useEffect} from "react";
import MovieList from "./components/MovieList";
import MovieListHead from "./components/MovieListHead";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValues] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(10);
    const [genres, setGenres] = useState([]);

    const getMovieRequest = async (searchValue) => {
        // const url = `https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=${searchValue}`;
        const url =
            "https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=harry potter";
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.results) {
            setMovies(responseJson.results);

            for (let i = 2; i <= responseJson.total_pages; i++) {
                // let url = `https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=${searchValue}&page=${i}`;
                let url = `https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=harry potter&page=${i}`;
                let response = await fetch(url);
                let responseJson = await response.json();
                setMovies((old) => [...old, ...responseJson.results]);
                // console.log(movies);
                //   setMovies(
                //     movies.sort(
                //         (a, b) => new Date(b.release_date) - new Date(a.release_date)
                //     )
                // );
                // console.log(
                //     movies.sort(
                //         (a, b) =>
                //             new Date(b.release_date) - new Date(a.release_date)
                //     )
                // );
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        getMovieRequest(searchValue);
        setLoading(false);
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
        <div>
            <div>
                <MovieListHead heading="Movies Search" />
                <SearchBox
                    searchValue={searchValue}
                    setSearchValues={setSearchValues}
                />
            </div>
            <MovieList
                movies={currentMovies}
                loading={loading}
                genres={genres}
            />

            <Pagination
                moviesPerPage={moviesPerPage}
                totalMovies={movies.length}
                paginate={paginate}
            />
        </div>
    );
};

export default App;
