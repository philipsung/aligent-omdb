import React, {useState} from "react";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SearchHeader() {

	//search states
	const [queryText, setQueryText] = useState('')
	const [queryType, setQueryType] = useState('')
	const [queryYear, setqueryYear] = useState([1970,2015])

	const queryAPI = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	

		let movies = []

		//API only allows searching by individual years -> repeat for range
		for (let i = queryYear[0]; i <= queryYear[1]; i++) {
			const url = `http://www.omdbapi.com/?apikey=19bc8d19&s=${queryText}&y=${i}&type=${queryType}`
			try {
				let res = await fetch(url)
				let data = await res.json()
				movies = movies.concat(data.Search)
				console.log(`${data.Search.length} results for ${i}. Total ${movies.length} results`)
			} catch(err) {
				console.error(err)
			}
		}
	}

	const currentYear = new Date().getFullYear()

	return (
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
					<input type="radio" value="movies" name="queryType" />Movies
					<input type="radio" value="series" name="queryType" />Series
					<input type="radio" value="episodes" name="queryType" />Episodes
				</div>
			</div>
		</form>
	)
}