import React, {useState} from "react";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function SearchHeader() {

	//search states
	const [query, setQuery] = useState('')
	const [movies, setMovies] = useState([])
	const [sliderValues, setSliderValues] = useState([])

	const queryAPI = async(e) => {
		//prevent page reload on form submission
		e.preventDefault();	
		console.log(sliderValues)
		console.log(e.target)
		const url = 'http://www.omdbapi.com/?apikey=19bc8d19&${query}'
	}

	const currentYear = new Date().getFullYear()

	return (
		<form className="form" onSubmit={queryAPI}>
			<div id="form-text">
				<label className="label" htmlFor="queryText">Search for:</label>
				<input className="input" type="text" 
					name="queryText"
					placeholder="E.g. Parasite"
				/>
			</div>
			<div id="form-parameters">
				<div id="form-parameters-left">
					<label className="label" htmlFor="queryYear">YEAR</label>
					<span id="minimumYear">Minimum</span>
					<Range id="slider" min={1880} max={currentYear}
						defaultValue={[1970,2015]}
						allowCross={false}
						onChange={(newValues) => setSliderValues(newValues)}
						
					/>
					<span id="maximumYear">Maximum</span>
				</div>
				
				<div id="form-parameters-right">
					<label className="label" htmlFor="queryType">TYPE</label>
					<input type="radio" value="" name="queryType" />Any
					<input type="radio" value="Movies" name="queryType" />Movies
					<input type="radio" value="Series" name="queryType" />Series
					<input type="radio" value="Episodes" name="queryType" />Episodes
				</div>
			</div>
		</form>
	)
}