import React, {useState, useEffect} from "react";
import Details from './Details.js'
import ResultList from './ResultList.js'
import HandleAPI from './HandleAPI.js'

export default function SearchContent(props) {

	// INCOMING PROPS
	// 	movies: Array<movie>
    //  onMovieChange(newMovies) 

	const [focus, setFocus] = useState('')

	function changeFocus(ID) {
		setFocus(ID)
	}

	//Clear current focus if a new search is made
	useEffect( () => {
		if (props.movies.length === 0)
		setFocus("") 
	}
		, [props.movies])

	return (
		<div id="search-results">
			<ResultList focus={focus}
						movies={props.movies}
						onMovieChange={props.onMovieChange}
						changeFocus={changeFocus}/>
			<Details imdbID={focus}/>
		</div>
	)
}