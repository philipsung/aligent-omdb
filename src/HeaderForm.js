import React, {useState, useEffect} from "react";
import SearchContent from './SearchContent.js'
import 'rc-slider/assets/index.css';
import HandleAPI from './HandleAPI.js';
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
	const [searchState, setState] = useState('')

	//Check the query and store first page of results if valid
	//If not valid, update state for result details
	const initialQuery = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	
		//init variables
		setState('')
		setMovies([])
		setPageLimit(1)

        let url = "https://www.omdbapi.com/?apikey=19bc8d19&"
        url = (queryType === "episode") ? url + `t=${queryText}&season=${querySeason}` 
            : url + `s=${queryText}&y=${queryYear}&type=${queryType}&page=1`

        let data = await HandleAPI.queryAPI(url)
		//Check search has results
		if (data === null || data.Response==="False") {
			setState("failed")
			return
		}
		//If successful then remove duplicates based on imdbID and set states
		else {
			setResultCount(data.totalResults)
			setPageLimit( Math.ceil(data.totalResults / 10))
			setMovies(HandleAPI.removeDuplicates( queryType==="episode" ? data.Episodes : data.Search))
			setNextPage(2)
		}
	}

	//Retrieve next page of results if it exists
	const getNextPage = async(e) => {
		if (nextPage > pageLimit || HandleAPI.getLoadStatus() == true) {
			return
		}

        let url = `https://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${queryYear}&type=${queryType}&page=${nextPage}`
        let data = await HandleAPI.queryAPI(url)
        if (data.Search.length > 0) setMovies(HandleAPI.removeDuplicates(movies.concat(data.Search)))
		setNextPage(nextPage + 1)
	}

	return (
		<>
			<form className="form" onSubmit={initialQuery}>
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
			{ searchState === "failed" 
			? 	<div id="search-state">
					<p>Search failed</p>
				</div>
			: null
			}
		</>
	)
}