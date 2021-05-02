import {React, useState, useEffect} from "react"

export default function Watchlist (props) {
	const [watchlist, setWatchlist] = useState()
	const [isInList, setInList] = useState()
	const [watchlistLoaded, setLoaded] = useState(false)


	//Convert JSON string to array of objects
	function stringToJSONArray (data) {
		let obj = JSON.parse(data)
		console.log(obj)
		let res = []
		for (let i in obj) {
			res.push(obj[i])
		}
		console.log(res)
		return res;
	}

	//Check if the focused movie is already in the watchlist
	function checkInList () {
		if (watchlist.find(element=> element.imdbID === props.movieDetails.imdbID) === undefined)
			setInList(false)
		else
			setInList(true)
	}

	//Check item is unique based on imdbID and add object to watchlist
	function addToWatchlist () {
		let movie = {
			Title: props.movieDetails.Title,
			imdbID: props.movieDetails.imdbID,
			Rated: props.movieDetails.Rated,
			Year: props.movieDetails.Year,
			Genre: props.movieDetails.Genre,
			Runtime: props.movieDetails.Runtime
		}
		setWatchlist(watchlist.concat(movie))
	}

	//Remove current focused movie from watchlist
	function removeFromWatchlist (e) {
		setWatchlist(watchlist.filter( movie => movie.imdbID !== props.movieDetails.imdbID ))
	}

	function showWatchlist () {
		console.log(watchlist)
	}

	/* If watchlist has not been loaded yet, check localstorage first
	if local storage is empty then set watchlist to [] & set state to loaded
	if local storage is not empty then load from localstorage & set state to loaded */
	useEffect(() => {
		console.log("Checking watchlist status")
		if (!watchlistLoaded) {
			console.log("Watchlist not loaded")
			setLoaded(true)
			let storedlist = localStorage.getItem("watchlist")
			if (storedlist !== null && storedlist !== "undefined") {
				console.log("Loaded existing list")
				setWatchlist(stringToJSONArray(localStorage.getItem("watchlist")))
			} else {
				console.log("Set new list")
				setWatchlist([])
			}
		}
	}, [watchlist, props.movieDetails])

	//When watchlist or focused movie is changed, convert from JSON to string and set in local storage
	useEffect(() => {
		if (watchlist) checkInList()

		try {
			localStorage.setItem('watchlist', JSON.stringify(watchlist))
		} catch (err) {
			console.error(err)
		}
		},[watchlist,props.movieDetails])

	return (
		<div id="watchlist-buttons">
			<button className="watchlist-button" onClick={showWatchlist}><i className="far fa-bookmark"></i> View</button>
			{isInList 
				? <button className="watchlist-button" onClick={removeFromWatchlist}><i className="far fa-bookmark"></i> Remove</button>
				: <button className="watchlist-button" onClick={addToWatchlist}><i className="fas fa-plus"></i> Add</button> 
			}
		</div>
	)
}