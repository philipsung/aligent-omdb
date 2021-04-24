import React, {useState} from "react";
import Details from './details.js'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SearchHeader() {

	//search states
	const [queryText, setQueryText] = useState('')
	const [queryType, setQueryType] = useState('')
	const [queryYear, setqueryYear] = useState([1970,1975])
	const [movies, setMovies] = useState([])
	const currentYear = new Date().getFullYear()
	const [focus, setFocus] = useState('')
	// const [focus, setFocus] = useState({
	// 	title: '',
	// 	img: '',
	// 	rating: '', //PG, M, etc.
	// 	release: '',
	// 	actors: '', //lead roles
	// 	plot: '', //description
	// 	director: '',
	// 	production: '',
	// 	runtime: '',
	// 	genre: '',
	// 	awards: '',
	// 	boxoffice: '',
	// 	ratings: '', //review ratings
	// })

	const queryAPI = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	

		//init variables
		setMovies([])
		let searchResult = []
		let page = 1
		let pageLimitReached = false
		let pageCount
		
		while (pageLimitReached === false) {
			try {
				//TODO change year to typed input
				const url = `http://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${queryYear[0]}&type=${queryType}&page=${page}`
				let res = await fetch(url)
				let data = await res.json()

				if (page === 1) {
					var resultCount = data.totalResults
					pageCount = Math.ceil(resultCount / 10)
				}
				searchResult = await searchResult.concat(data.Search)

				page++
				if (page > pageCount) pageLimitReached = true
			} catch (err) {
				continue
			}
		}
		setMovies(searchResult)
	}

	// function cardClick (ID) {
	// 	setFocus(ID)
	// }
	
	return (
		<>
			<form className="form" onSubmit={queryAPI}>
				<div id="form-text">
					<label className="label" htmlFor="queryText">Search for:</label>
					<input className="input" type="text" 
						name="queryText"
						placeholder="E.g. Parasite"
						onChange={ (e) => setQueryText(e.target.value)}
					/>
				</div>

				<div id="form-parameters">
					<div id="form-parameters-left">
						<label className="label" htmlFor="queryYear">YEAR</label>
						<div id="form-slider">
							<span id="minimumYear">{queryYear[0]}</span>
							<Range id="slider" min={1880} max={currentYear}
								defaultValue={[1970,2015]}
								allowCross={false}
								onChange={(newValues) => setqueryYear(newValues)}
							/>
							<span id="maximumYear">{queryYear[1]}</span>
						</div>
					</div>
					
					<div id="form-parameters-right" onChange={ (e) => setQueryType(e.target.value)}>
						<label className="label" htmlFor="queryType">TYPE</label>
						<input type="radio" value="" name="queryType" defaultChecked />Any
						<input type="radio" value="movie" name="queryType" />Movies
						<input type="radio" value="series" name="queryType" />Series
						<input type="radio" value="episodes" name="queryType" />Episodes
					</div>
				</div>
			</form>

			<div id="search-results">
				<div id="search-results-list">
					<p>{movies.length} RESULTS</p>
					{movies.map(movie => (
						<div className="movieCard" 
							key={movie.imdbID}
							onClick={ () => setFocus(movie.imdbID)} >
							<div className="movieCard--poster">
								<img
									src={movie.Poster}
									alt={movie.Title + " poster"}
								/>
							</div>
							<div className="movieCard--title">
								<h3>{movie.Title}</h3>
								<p>{movie.Year}</p>
							</div>
						</div>
						))
					}
				</div>

				<div id="search-results-details">
					<Details imdbID = {focus}/>	
				</div>
			</div>
		</>
	)
}