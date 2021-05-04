import './App.css';
import {React , useState} from "react"
import HeaderForm from './HeaderForm.js'
import SearchContent from './SearchContent.js'

function App() {
  const [movies, setMovies] = useState([])

  //Set value of movies function. Used by child components
  function onMovieChange(newMovies) {
    setMovies(newMovies)
  }
  
  return (
    <div className="App">
        <HeaderForm 
          movies={movies} 
          onMovieChange={onMovieChange}
        />
        <SearchContent
          movies={movies}
          onMovieChange={onMovieChange}
        />
    </div>
  );
}

export default App;