import React, {useState} from "react";
import Details from './details.js'
import ResultList from './resultList.js'

export default function SearchResults(props) {

	const [focus, setFocus] = useState('')

	function changeFocus(ID) {
		setFocus(ID)
	}
	return (
		<div id="search-results">
			<ResultList pageLimit={props.pageLimit} nextPage={props.nextPage} resultCount={props.resultCount} movies={props.movies} getNextPage={props.getNextPage} changeFocus={changeFocus}/>

			<div id="search-results-details">
				<Details imdbID={focus}/>	
			</div>
		</div>
	)
}