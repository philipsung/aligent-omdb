import React, {useState, useEffect} from "react";
import HandleAPI from "./HandleAPI.js";
import MovieRatings from "./MovieRatings.js"
import Watchlist from "./Watchlist.js"

export default function Details(props) {

	// INCOMING PROPS
	// imdbID: String

	const [movieDetails, setMovieDetails] = useState({})
	const [loadingDetails, setLoading] = useState('')

	//Load specific movie details when focused movie changes
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
		<div id="search-results-details">
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
							<div id="focused-movie-details--positioning">
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
		</div>
		)
	}
	else {
		return (
			<div id="search-results-details">
				<h3 className="search-result-details--info">SEARCH INFO</h3>
				<table>
					<thead>
						<tr>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Any</td>
							<td>Searches for any movie, series, video game</td>
						</tr>
						<tr>
							<td>Movies</td>
							<td>Searches only for movies</td>
						</tr>
						<tr>
							<td>Series</td>
							<td>Searches only for a TV series. A series will only appear for the years where it started and/or ended</td>
						</tr>
						<tr>
							<td>Episodes</td>
							<td>Returns a list of episodes a matching season and TV show. Must enter a season number for this search.</td>
						</tr>
					</tbody>
				</table>
				<h3 className="search-result-details--info">WATCHLIST</h3>
				<p>After an item has been selected it can be added to a watchlist using buttons on the top right corner of the window. The watchlist is stored offline in local storage and will persist after the page has been closed.</p>
                        
				<p id="search-result-details--API-link">Powered by <a href="http://www.omdbapi.com/">OMDb API</a></p>
			</div>
		)
	}
}