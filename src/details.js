import React, {useState, useEffect} from "react";

export default function Details(props) {


	const [movieDetails, setMovieDetails] = useState({})

	useEffect(() => {
		async function fetchData ()  {
			const url = `http://www.omdbapi.com/?apikey=19bc8d19&i=${props.imdbID}`
			let res = await fetch(url)
			let data = await res.json()
			setMovieDetails({...data})
		}
		fetchData()
	}
	, [props.imdbID]);

	

	return (
		<div>
			<h1>{movieDetails.Title}</h1>
			<img src={movieDetails.Poster} />
			<p>{movieDetails.Plot}</p>
		</div>
	)
}