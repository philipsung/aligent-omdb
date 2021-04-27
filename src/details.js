import React, {useState, useEffect} from "react";

export default function Details(props) {


	const [movieDetails, setMovieDetails] = useState({})

	useEffect(() => {
		async function fetchData ()  {
			if (props.imdbID !== '') {
				console.log("Found ID")
				try {
					const url = `http://www.omdbapi.com/?apikey=19bc8d19&i=${props.imdbID}`
					let res = await fetch(url)
					let data = await res.json()
					setMovieDetails({...data})
				} catch (err) {
					console.err(err)
				}
			}
		}
		fetchData()
	}
	, [props.imdbID]);

	if (props.imdbID !== "") {
		return (
			<div>
				<h1>{movieDetails.Title}</h1>
				<img src={movieDetails.Poster} 
					alt={movieDetails.Title + " Poster"}
				/>
				<p>{movieDetails.Plot}</p>
			</div>
		)
	}
	else {
		return (
			<div>
				Please enter a name and select other parameters if required then press enter.
			</div>
		)
	}
}