import React, {useState, useEffect} from "react";
import MovieRatings from "./MovieRatings.js"
import Watchlist from "./Watchlist.js"
export default function Details(props) {


	const [movieDetails, setMovieDetails] = useState({})
	useEffect(() => {
		async function fetchData ()  {
			if (props.imdbID !== '') {
				try {
					const url = `http://www.omdbapi.com/?apikey=19bc8d19&i=${props.imdbID}`
					let res = await fetch(url)
					let data = await res.json()
					setMovieDetails({...data})
				} catch (err) {
					console.err(err)
				}
			}
		}
		fetchData()
	}
	, [props.imdbID]);

	//Check a focus has been selected
	if (props.imdbID !== "") {
		return (
			<div id="focused-movie">
				<div id="focused-movie-top">
					<div id="focused-movie--poster">
						<img src={movieDetails.Poster} 
							alt={movieDetails.Title + " Poster"}
						/>
					</div>

					<div id="focused-movie--details">
						<div id="position">
							<h1>{movieDetails.Title}</h1>
							<p><span id="focused-movie--rated">{movieDetails.Rated}</span>
							<span>{movieDetails.Year} · {movieDetails.Genre} · {movieDetails.Runtime}</span></p>
							<p><strong>Stars:</strong> {movieDetails.Actors}</p>
							<p><strong>Director:</strong> {movieDetails.Director}</p>
							<p><strong>Production:</strong> {movieDetails.Production}</p>
							<p><strong>Gross USA:</strong> {movieDetails.BoxOffice}</p>
							<p>{movieDetails.Awards}</p>
						</div>
					</div>
				</div>
				<hr/>
				<div id="focused-movie--plot">
					<p>{movieDetails.Plot}</p>
				</div>
				<hr/>
				<MovieRatings movieDetails={movieDetails}/>
				<Watchlist movieDetails={movieDetails}/>
			</div>
		)
	}
	else {
		return (
			<div>
				Search guide: 
			</div>
		)
	}
}