import {React, useState, useEffect} from "react"

export default function Watchlist (props) {
	const [watchlist, setWatchlist] = useState([])
	const [isInList, setInList] = useState()


	//Init watchlist / check local storage
	if (watchlist === [] && localStorage.getItem("watchlist")) {
		console.log("Found stored watchlist.")
		console.log(localStorage.getItem("watchlist"))
		setWatchlist(localStorage.getItem("watchlist"))
	}

	//Check if the focused movie is already in the watchlist
	function checkInList () {
		console.log("Checking list...")
		if (watchlist.find(element=> element.imdbID === props.movieDetails.imdbID) === undefined)
			setInList(false)
		else
			setInList(true)
	}

	//Check item is unique based on imdbID and add object to watchlist
	function addToWatchlist () {
		if (!isInList) {
			console.log("Added")
			let movie = {
				Title: props.movieDetails.Title,
				imdbID: props.movieDetails.imdbID,
				Rated: props.movieDetails.Rated,
				Year: props.movieDetails.Year,
				Genre: props.movieDetails.Genre,
				Runtime: props.movieDetails.Runtime
			}
			setWatchlist(watchlist.concat(movie))
		} else console.log("Duplicate")
	}

	//Remove current focused movie from watchlist
	function removeFromWatchlist () {
		setWatchlist(watchlist.filter( movie => movie.imdbID !== props.movieDetails.imdbID ))
	}


	//When watchlist or focused movie is changed, convert from JSON to string and set in local storage
	useEffect(() => {
		if (watchlist) checkInList()

		try {
			localStorage.setItem('watchlist', JSON.stringify(watchlist))
			console.log("Stored watchlist")
		} catch (err) {
			console.error(err)
		}
		},[watchlist,props.movieDetails])

	return (
		<div id="watchlist-buttons">
			<button className="watchlist-button" onClick={addToWatchlist}><i className="far fa-bookmark"></i> View</button>
			{isInList 
				? <button className="watchlist-button" onClick={removeFromWatchlist}><i className="far fa-bookmark"></i> Remove</button>
				: <button className="watchlist-button" onClick={addToWatchlist}><i className="fas fa-plus"></i> Add</button> 
			}
		</div>
	)
}