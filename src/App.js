import './App.css';
import SearchHeader from './searchHeader.js'
import SearchResults from './searchResults.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchHeader/>
        <SearchResults/>
      </header>
    </div>
  );
}

export default App;

