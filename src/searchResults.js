import React, {useState, useEffect} from "react";
import Details from './details.js'
import ResultList from './resultList.js'

export default function SearchResults(props) {

	const [focus, setFocus] = useState('')

	// useEffect (() => console.log(props), [props]) 

	return (
		<div id="search-results">
			<ResultList resultCount={props.resultCount} movies={props.movies} getNextPage={props.getNextPage}/>

			<div id="search-results-details">
				<Details imdbID = {focus}/>	
			</div>
		</div>
	)
}