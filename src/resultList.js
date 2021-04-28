import React, {useRef, useCallback} from "react";

export default function SearchResults(props) {

	//OBSERVER
	const observer = useRef()
	const bottomOfResults = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && props.nextPage < props.pageLimit) {
				props.getNextPage()
			}
		})
		if (node) observer.current.observe(node)
	}, [props.pageLimit, props.nextPage])

	if (props.movies && props.movies.length > 0) {
		return (
			<div id="search-results-list">
				<p id="search-results--counter">{props.movies.length} / {props.resultCount} RESULTS</p>

				{props.movies.map((movie, index) => (
					<div className="movieCard" 
						key={movie.imdbID}
						onClick={ () => {props.changeFocus(movie.imdbID)
					}} >
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
				<div id="search-results--bottom" ref={bottomOfResults}>

				</div>
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