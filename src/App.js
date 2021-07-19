import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import MovieListHead from './components/MovieListHead';
import SearchBox from './components/SearchBox';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValues] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=${searchValue}`;
    // const url = 'https://api.themoviedb.org/3/search/movie?api_key=d18619df5c6ddee814967b5e4abec16b&query=star wars';
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.results) {
      setMovies(responseJson.results);
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue]);

  return (
    <div>
      <div>
        <MovieListHead heading='Movies Search'/>
        <SearchBox searchValue={searchValue} setSearchValues={setSearchValues}/>
      </div>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
