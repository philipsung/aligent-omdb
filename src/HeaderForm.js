import React, {useState, useEffect} from "react";
import 'rc-slider/assets/index.css';
import HandleAPI from './HandleAPI.js';

export default function HeaderForm(props) {

	// INCOMING PROPS 
	// 	movies: Array<movie>
    //  onMovieChange(newMovies) 

	//Form states
	const [queryText, setQueryText] = useState('')
	const [queryType, setQueryType] = useState('')
	const [queryYear, setqueryYear] = useState('')
	const [querySeason, setSeason] = useState('')
	const [searchState, setState] = useState('')
	const currentYear = new Date().getFullYear()

	//Check the query and store first page of results if valid
	//If not valid, update state for result details
	const initialQuery = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	
		//init variables
		setState('')
		props.onMovieChange([])

		HandleAPI.setQuery({
			text: queryText,
			year: queryYear,
			type: queryType,
			season: querySeason,
			nextPage: 2,
		})

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
			HandleAPI.setSearchLimits(data.totalResults ? data.totalResults : 0)
			let uniqueList = HandleAPI.removeDuplicates( queryType==="episode" ? data.Episodes : data.Search)
			props.onMovieChange(uniqueList)
		}
	}

	return (
		<>
			<form id="search-form" onSubmit={initialQuery}>
				<div id="form-text">
					<label htmlFor="year"><button className="search-label" type="submit"><i className="fas fa-search"></i></button>
					</label>
					<input className="text-input" type="text" 
						name="year"
						placeholder="E.g. Parasite"
						minLength="3"
						onChange={ (e) => setQueryText(e.target.value)
						}
					/>
				</div>

				<div id="form-parameters">
					<div id="form-parameters-left">
						{queryType !== "episode" 
						? <>	<label className="form-filter-label" htmlFor="queryYear">YEAR</label>
							<input className="year-input" type="number" name="queryYear"
								min="1880" max={currentYear} maxLength="4"  
								value={queryYear}
								onChange={ (e) => setqueryYear(e.target.value)} />
								</>
						: null
					}

					</div>
					
					<div id="form-parameters-right" onChange={ (e) => setQueryType(e.target.value)}>
						<label className="form-filter-label" htmlFor="queryType">TYPE</label>
						<input type="radio" value="" name="queryType" defaultChecked />Any
						<input type="radio" value="movie" name="queryType" />Movies
						<input type="radio" value="series" name="queryType" />Series
						<input type="radio" value="episode" name="queryType" />Episodes
					</div>
					
					{queryType === "episode" 
					?	<div id="season-input">
							<label className="form-filter-label" htmlFor="querySeason">SEASON</label>
							<input className="form-season" type="number" name="querySeason" 
								min="1" maxLength="3" value={querySeason}
								onChange={ (e) => setSeason(e.target.value)} />
						</div> 
					: null}
				</div>
				{/* <input type="submit" /> */}
			</form>
			{ searchState === "failed" 
			? 	<div id="search-state">
					<p>Search failed</p>
				</div>
			: null
			}
		</>
	)
}