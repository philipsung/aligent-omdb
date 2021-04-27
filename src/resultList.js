import React, {useState} from "react";
import Details from './details.js'

export default function SearchResults(props) {

	const [focus, setFocus] = useState('')

	if (props.movies.length > 0) {
		return (
			<div id="search-results-list">
				<p id="search-results--counter">{props.movies.length} / {props.resultCount} RESULTS</p>

				{props.movies.map(movie => (
					<div className="movieCard" 
						key={movie.imdbID}
						onClick={ () => setFocus(movie.imdbID)} >
						<div className="movieCard--poster">
							<img
								src={movie.Poster}
								alt={movie.Title + " poster"}
							/>
						</div>
						<div className="movieCard--title">
							<h3>{movie.Title}</h3>
							<p>{movie.Year}</p>
						</div>
					</div>
					))
				}
				<button type="button" onClick={() => props.getNextPage()}>Load next</button>
			</div>
		)
	} 
	else {
		return (
			<div id="search-results-list">
	
			</div>
		)
	}
}