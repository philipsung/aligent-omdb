import React, {useRef, useCallback} from "react";
import MovieCard from "./MovieCard.js"
export default function ResultList(props) {

	//Init observer
	const observer = useRef()
	const bottomOfResults = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			//Fetch next page if available and div appears on screen (bottom of page is reached)
			if (entries[0].isIntersecting && props.nextPage < props.pageLimit) {
				props.getNextPage()
			}
		})
		//if node exists then set observer
		if (node) observer.current.observe(node)
	}, [props.pageLimit, props.nextPage])

	//only render if movies exist in props
	if (props.movies && props.movies.length > 0) {
		return (
			<div id="search-results-list">
				<div id="search-results--counter">
					<p>{props.movies.length} {props.resultCount ? <span> / {props.resultCount}</span> : null}  RESULTS</p>
				</div>

				{props.movies.map(movie => (
					<MovieCard movie={movie} focus={props.focus} changeFocus={props.changeFocus}/>
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