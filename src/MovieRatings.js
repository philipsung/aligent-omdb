import React from "react"

export default function MovieRatings (props) {

	console.log(props.movieDetails)
	console.log(props.movieDetails.Rated)
	console.log(props.movieDetails.Released)
	console.log(props.movieDetails.Runtime)
	console.log(props.movieDetails.Genre)
	console.log(props.movieDetails.Director)
	console.log(props.movieDetails.Writer)
	console.log(props.movieDetails.Actors)
	console.log(props.movieDetails.Country)
	console.log(props.movieDetails.Ratings)


	if (props.movieDetails.Ratings) {
		console.log("Trying ratings")
		return (
			<div id="focused-movie--ratings">
				{props.movieDetails.Ratings.map(ratings => (
				<div className="rating">	
					<p>{ratings.Value}</p>
					<p>{ratings.Source}</p>
				</div>
				))}
			</div>
		)
	} else {
		return (
			<div>
				NO RATINGS
			</div>
		)
	}

}