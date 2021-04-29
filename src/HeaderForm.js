import React, {useState, useEffect} from "react";
import SearchContent from './SearchContent.js'
import 'rc-slider/assets/index.css';

export default function HeaderForm() {

	//Form states
	const [queryText, setQueryText] = useState('')
	const [queryType, setQueryType] = useState('')
	const [queryYear, setqueryYear] = useState('')
	const [querySeason, setSeason] = useState('')
	const currentYear = new Date().getFullYear()

	//Result states
	const [movies, setMovies] = useState([])
	const [nextPage, setNextPage] = useState(1)
	const [pageLimit, setPageLimit] = useState(1)
	const [resultCount, setResultCount] = useState(-1)
	const [state, setState] = useState('idle')

	//Remove any duplicates based on imdbID being unique
	//Function from https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
	function removeDuplicates (movies) {
		const uniqueMovies = Array.from(new Set(movies.map(a => a.imdbID)))
		 .map(imdbID => {
		   return movies.find(a => a.imdbID === imdbID)
		 })
		 return uniqueMovies
	}

	//Check the query and store first page of results if valid
	//If not valid, update state for result details
	const queryAPI = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	

		//init variables
		setMovies([])
		setPageLimit(1)

		let data = {}
		let url
		try {
			//Submit different query format
			if (queryType === "episode") {
				url = `http://www.omdbapi.com/?apikey=19bc8d19&t=${queryText}&season=${querySeason}`
			} else url = `http://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${queryYear}&type=${queryType}&page=1`

			let res = await fetch(url)
			data = await res.json()
		} catch (err) {
			console.error(err)
		}

		//Check search has results
		if (data.Response==="False") {
			//TODO: Set flag for bad query
			setState("failed")
			return
		}
		//Process results and set pageLimit
		else {
			setResultCount(data.totalResults)
			setPageLimit( Math.ceil(data.totalResults / 10))
			setMovies(removeDuplicates( queryType==="episode" ? data.Episodes : data.Search))
			setNextPage(2)
		}
	}

	//Retrieve next page of results if it exists
	const getNextPage = async(e) => {
		let data = {}
		if (nextPage > pageLimit) {
			return
		}

		try {
			const url = `http://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${queryYear}&type=${queryType}&page=${nextPage}`
			let res = await fetch(url)
			data = await res.json()
			setMovies(removeDuplicates(movies.concat(data.Search)))
		} catch (err) {
			console.error(err)
		}
		setNextPage(nextPage + 1)
	}

	return (
		<>
			<form className="form" onSubmit={queryAPI}>
				<div id="form-text">
					<label className="search-label" htmlFor="year"><i className="fas fa-search"></i></label>
					<input className="text-input" type="text" 
						name="year"
						placeholder="E.g. Parasite"
						onChange={ (e) => setQueryText(e.target.value)}
					/>
				</div>

				<div id="form-parameters">
					<div id="form-parameters-left">
						{queryType !== "episode" 
						? <>	<label className="label-filter" htmlFor="queryYear">YEAR</label>
							<input className="year-input" type="number" name="queryYear"
								min="1880" max={currentYear} maxLength="4"  
								value={queryYear}
								onChange={ (e) => setqueryYear(e.target.value)} />
								</>
						: null
					}

					</div>
					
					<div id="form-parameters-right" onChange={ (e) => setQueryType(e.target.value)}>
						<label className="label-filter" htmlFor="queryType">TYPE</label>
						<input type="radio" value="" name="queryType" defaultChecked />Any
						<input type="radio" value="movie" name="queryType" />Movies
						<input type="radio" value="series" name="queryType" />Series
						<input type="radio" value="episode" name="queryType" />Episodes
					</div>
					
					{queryType === "episode" 
					?	<div id="season-input">
							<label className="label-filter" htmlFor="querySeason">SEASON</label>
							<input className="form-season" type="number" name="querySeason" 
								min="1" maxLength="3" value={querySeason}
								onChange={ (e) => setSeason(e.target.value)} />
						</div> 
					: null}
				</div>
				<input type="submit" id="form--submit"/>
			</form>
			<SearchContent pageLimit={pageLimit} nextPage={nextPage} resultCount={resultCount} movies={movies} getNextPage={getNextPage}/>
		</>
	)
}