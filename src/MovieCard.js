import React from "react"

export default function MovieCard(props){

	let classList = (props.focus === props.movie.imdbID) ? "movieCard activeCard" : "movieCard"

	return (
		<div className={classList} 
			key={props.movie.imdbID}
			onClick={ () => props.changeFocus(props.movie.imdbID)
		} >
			<div className="movieCard--poster">
				{props.movie.Poster 
					? <img
						src={props.movie.Poster}
						alt={props.movie.Title + " poster"}
					/> 
					: null}
				
			</div>
			<div className="movieCard--details">
				<h3 className="movieCard--title">{props.movie.Title}</h3>
				<p>{props.movie.Year}</p>
			</div>
		</div>
	)
}