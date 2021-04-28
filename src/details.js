import React, {useState, useEffect} from "react";
import MovieRatings from "./MovieRatings.js"
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

	if (props.imdbID !== "") {
		return (
			<div>
				<div id="focused-movie-top">
					<div id="focused-movie--poster">
						<img src={movieDetails.Poster} 
							alt={movieDetails.Title + " Poster"}
						/>
					</div>

					<div id="focused-movie--details">
						<div id="position">
							<h1>{movieDetails.Title}</h1>
							<p>1980 AIction adeventure</p>
							<p>actors mork ham</p>
						</div>
					</div>
				</div>

				<hr/>

				<div>
					<p>{movieDetails.Plot}</p>
				</div>

				<hr/>
				
				<div>
					<MovieRatings movieDetails={movieDetails}/>
				</div>
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