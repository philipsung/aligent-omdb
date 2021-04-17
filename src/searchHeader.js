import React, {useState} from "react";

/* ***TODO***
queryAPI - send/receive query from API
queryYear - change input to allow a range selection

*/

export default function SearchHeader() {

	const queryAPI = async(e) => {
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
					<span className="label">Minimum</span>
					<input className="input" type="range"
						name="queryYear"
						min="1880" max={currentYear}
					/>
					<span className="label">Maximum</span>
				</div>
				
				<div id="form-parameters-right">
					<label className="label" htmlFor="queryType">TYPE</label>
					<input type="radio" value="Any" name="queryType" />Any
					<input type="radio" value="Movies" name="queryType" />Movies
					<input type="radio" value="Series" name="queryType" />Series
					<input type="radio" value="Episodes" name="queryType" />Episodes
				</div>
			</div>

		</form>
	)
}