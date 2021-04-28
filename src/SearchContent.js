import React, {useState} from "react";
import Details from './Details.js'
import ResultList from './ResultList.js'

export default function SearchContent(props) {

	const [focus, setFocus] = useState('')

	function changeFocus(ID) {
		setFocus(ID)
	}
	return (
		<div id="search-results">
			<ResultList pageLimit={props.pageLimit} nextPage={props.nextPage} focus={focus}
				resultCount={props.resultCount} movies={props.movies}
				getNextPage={props.getNextPage} changeFocus={changeFocus}/>

			<div id="search-results-details">
				<Details imdbID={focus}/>
			</div>
		</div>
	)
}