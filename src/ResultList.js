import React, {useRef, useCallback, useState} from "react";
import HandleAPI from "./HandleAPI.js";
import MovieCard from "./MovieCard.js"

export default function ResultList(props) {

	// INCOMING PROPS
	// focus: string (unique imdb ID)
	// movies: Array<movie>
    // onMovieChange(newMovies) 
	// changeFocus(ID)

	//Retrieve next page of results if it exists
	const getNextPage = async(e) => {
		let data = await HandleAPI.getNextPage()
		if (data && data.Search.length > 0) {
			let uniqueList = HandleAPI.removeDuplicates(props.movies.concat(data.Search))
			props.onMovieChange(uniqueList)
		}
	}
	
	//Init observer
	const observer = useRef()
	const bottomOfResults = useCallback(node => {
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			//Fetch next page if available and div appears on screen (bottom of page is reached)
			if (entries[0].isIntersecting && HandleAPI.nextPageAvailable() === true) {
				if (HandleAPI.getLoadStatus() === false) {
					getNextPage()
				}
			}
		})
		//if node exists then set observer
		if (node) observer.current.observe(node)
	}, [props.movies])

	//only render if movies exist in props
	if (props.movies && props.movies.length > 0) {
		return (
			<div id="search-results-list">
				<div id="search-results--counter">
					<p>{props.movies.length} {HandleAPI.getResultCount() !== 0 ? <span> / {HandleAPI.getResultCount()}</span> : null}  RESULTS</p>
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