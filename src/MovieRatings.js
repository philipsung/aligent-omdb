import React from "react"

export default function MovieRatings (props) {
	// INCOMING PROPS
	// movieDetails: movie object

	//Wait until ratings array exists before trying to render
	if (props.movieDetails.Ratings) {
		return (
			<div id="focused-movie--ratings">
				{props.movieDetails.Ratings.map(ratings => (
				<div className="rating" key={ratings.source}>	
					<p>{ratings.Value}</p>
					<p>{ratings.Source}</p>
				</div>
				))}
			</div>
		)
	} else {
		return (
			<div>
				<p>Ratings not found for IMDb, Rotten Tomatoes, or Metacritic.</p>
			</div>
		)
	}

}