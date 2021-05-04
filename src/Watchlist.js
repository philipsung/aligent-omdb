import {React, useState, useEffect} from "react"

export default function Watchlist (props) {

	// INCOMING PROPS
	// movieDetails: movie object

	const [watchlist, setWatchlist] = useState()
	const [isInList, setInList] = useState()
	const [watchlistLoaded, setLoaded] = useState(false)
	const [modalVisible, setModal] = useState(false)

	//Convert JSON string to array of objects
	function stringToJSONArray (data) {
		let obj = JSON.parse(data)
		let res = []
		for (let i in obj) {
			res.push(obj[i])
		}
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
	
	//Enable modal to display watchlist
	function toggleWatchlist () {
		setModal(!modalVisible)
	}

	//Load watchlist from local storage or set to empty array
	function loadWatchlist () {
		//Check local storage first
		let storedList = localStorage.getItem("watchlist")
		if (storedList !== null) {
			//If local copy exists parse and store in state
			let converted = JSON.parse(storedList)
			setWatchlist(converted)
		} else 
			setWatchlist([])
	}
	
	// Load watchlist if load state is still false
	useEffect(() => {
		if (!watchlistLoaded) {
			loadWatchlist()
		}
	}, [props.movieDetails])

	//Set load state to true once watchlist has been loaded
	useEffect(() => {
		if (!watchlistLoaded)
			setLoaded(true)
	}, [watchlist])

	//When watchlist or focused movie is changed, convert from JSON to string and set in local storage
	useEffect(() => {
		if (!watchlistLoaded) return
		
		checkInList()
		try {
			localStorage.setItem('watchlist', JSON.stringify(watchlist))
		} catch (err) {
			console.error(err)
		}
		},[watchlist,props.movieDetails])

	return (
		<div>
			<div id="watchlist-buttons">
				<button className="watchlist-button" onClick={toggleWatchlist}><i className="far fa-bookmark"></i> View</button>
				{isInList 
					? <button className="watchlist-button" onClick={removeFromWatchlist}><i className="fas fa-trash-alt"></i> Remove</button>
					: <button className="watchlist-button" onClick={addToWatchlist}><i className="fas fa-plus"></i> Add</button> 
				}
			</div>
			{modalVisible ? 
				<div id="watchlist-modal">
					<h3>WATCH LIST</h3>
					<ul>
						{watchlist.map( movie => (
							<li><strong>{movie.Title}</strong> · {movie.Rated} · {movie.Year} · {movie.Genre} · {movie.Runtime} </li>
						)
						)}
					</ul>
					<button className="watchlist-button" onClick={toggleWatchlist}>Close</button>
				</div>
				: null
			}
		</div>
	)
}