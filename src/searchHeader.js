import React, {useState} from "react";
import SearchResults from './searchResults.js'
import 'rc-slider/assets/index.css';

export default function SearchHeader() {

	//Form states
	const [queryText, setQueryText] = useState('')
	const [queryType, setQueryType] = useState('')
	const [queryYear, setqueryYear] = useState('')
	const currentYear = new Date().getFullYear()

	//Result states
	const [movies, setMovies] = useState([])
	const [nextPage, setNextPage] = useState(1)
	const [pageLimit, setPageLimit] = useState(1)
	const [resultCount, setResultCount] = useState(-1)

	//Check the query and store first page of results if valid
	//If not valid, update state for result details
	const queryAPI = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	

		//init variables
		setMovies([])
		setNextPage(1)
		setPageLimit(1)

		let data = {}

		try {
			const url = `http://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${queryYear}&type=${queryType}&page=1`
			let res = await fetch(url)
			data = await res.json()
		} catch (err) {
			console.error(err)
		}

		//Check search has results
		if (data.Response==="false") {
			//TODO: Set flag for bad query
			console.log("No results found. Try a different search")
		}
		//Process results and set pageLimit
		else {
			setResultCount(data.totalResults)
			setPageLimit( Math.ceil(data.totalResults / 10))
			setMovies(data.Search)
			setNextPage(nextPage + 1)
		}
	}

	//Retrieve next page of results if it exists
	const getNextPage = async(e) => {
		let data = {}

		if (nextPage > pageLimit) {
			console.log("Reached last page")
			return
		}

		try {
			const url = `http://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${queryYear}&type=${queryType}&page=${nextPage}`
			let res = await fetch(url)
			data = await res.json()
			setMovies(movies.concat(data.Search))
		} catch (err) {
			console.error(err)
		}
		setNextPage(nextPage + 1)
	}

	return (
		<>
			<form className="form" onSubmit={queryAPI}>
				<div id="form-text">
					<label className="label" htmlFor="year">Search for:</label>
					<input className="input" type="text" 
						name="year"
						placeholder="E.g. Parasite"
						onChange={ (e) => setQueryText(e.target.value)}
					/>
				</div>

				<div id="form-parameters">
					<div id="form-parameters-left">
						<label className="label" htmlFor="queryYear">YEAR</label>
						<input type="number" name="queryYear"
							min="1880" max={currentYear} maxLength="4"  
							value={queryYear}
							onChange={ (e) => setqueryYear(e.target.value)} />
					</div>
					
					<div id="form-parameters-right" onChange={ (e) => setQueryType(e.target.value)}>
						<label className="label" htmlFor="queryType">TYPE</label>
						<input type="radio" value="" name="queryType" defaultChecked />Any
						<input type="radio" value="movie" name="queryType" />Movies
						<input type="radio" value="series" name="queryType" />Series
						<input type="radio" value="episodes" name="queryType" />Episodes
					</div>
				</div>
				<input type="submit" id="form--submit"/>
			</form>

			<SearchResults resultCount={resultCount} movies={movies} getNextPage={getNextPage}/>
		</>
	)
}