import React, {useState, useEffect} from "react";
import HandleAPI from "./HandleAPI.js";
import MovieRatings from "./MovieRatings.js"
import Watchlist from "./Watchlist.js"
export default function Details(props) {


	const [movieDetails, setMovieDetails] = useState({})
	const [loadingDetails, setLoading] = useState('')

	useEffect(() => {
		async function fetchData ()  {
			if (props.imdbID !== '') {
				const url = `http://www.omdbapi.com/?apikey=19bc8d19&i=${props.imdbID}`
				let data = await HandleAPI.queryAPI(url)
				setMovieDetails({...data})
			}
			setLoading(false)
		}
		setLoading(true)
		fetchData()
	}
	, [props.imdbID]);

	//Check a focus has been selected
	if (props.imdbID !== "") {
		return (
			<div id="focused-movie">
				{loadingDetails === false ? 
				<>
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
				</> 
				:	<div id="details--loading">
						<h3>Loading movie</h3>
					</div>
			}
			</div>
		)
	}
	else {
		return (
			<div>
				<h3>Search Guide</h3>
				<p>Bro ipsum dolor sit amet crunchy grip tape park rat flow. Rock-ectomy stoked north shore, white room lid dirt huck sucker hole chowder dust on crust. Twin tip dirt titanium stoked, spin schraeder pipe death cookies gondy stoked huck. Bump wack brain bucket spin avie core shot, avie pipe 180 free ride pillow popping sucker hole north shore. Frozen chicken heads manny grom ski bum bail glades gondy.</p>
			</div>
		)
	}
}