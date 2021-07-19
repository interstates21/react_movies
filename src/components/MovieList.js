import React, {useState} from 'react';


const MovieList = (props) => {
	const [genres, setGenres] = useState([])

	const getGenresRequest = async () => {
		const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d18619df5c6ddee814967b5e4abec16b';
    	const response = await fetch(url);
    	const responseJson = await response.json();

    	if (responseJson.genres) {
      		setGenres(responseJson.genres);
    	}
  	}
	getGenresRequest()

	return (
		<>
		{
			props.movies.map((movie, index) => <div>

				<h3>{movie.title}</h3>
				<p>{movie.release_date.slice(0, 4)}</p>
				<div>
					
					{
						genres.map((genre) => {
							for (let genre_id of movie.genre_ids) {
								if (genre.id === genre_id) {
									return genre.name + ' '
								}
							}
							
					})}
				</div>
				<img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title}></img>
				
			</div>)
		}
		</>
	)
}

export default MovieList;