//Contain all API related functions
class HandleAPI {
    static isLoading = false
    static query = {
        text: "",
        year: "",
        type: "",
        season: "",
        nextPage: "",
        pageLimit: "",
        resultCount: "",
    }

    // Return load status
    static getLoadStatus () {
        return this.isLoading
    }

    // Return result count
    static getResultCount () {
        return this.query.resultCount
    }

    // Return next page number
    static getNextPage() {
        return this.query.nextPage
    }
    static nextPageAvailable () {
        return this.query.nextPage > this.query.pageLimit ? false : true
    }

    // Set new query values
    static setQuery(newQuery) {
        this.query = {...newQuery}
    }

    // Set number of results and available pages
    static setSearchLimits (resultCount) {
        this.query.resultCount = resultCount
        this.query.pageLimit = Math.ceil(resultCount / 10)
    }

    //Query API and return response if received
    static async queryAPI (url) {
        this.isLoading = true
        let data = []
        try {
            let res = await fetch(url)
            data = await res.json()
            this.isLoading =  false
            return data
        } catch(err) {
            console.error(err)
            this.isLoading = false
            return null
        }
    }

    // Build URL for next available page and return the data
    static async getNextPage (e){
        if (this.nextPageAvailable && this.isLoading === false) {
            let url = `https://www.omdbapi.com/?apikey=19bc8d19&s=${this.query.text}&y=${this.query.year}&type=${this.query.type}&page=${this.query.nextPage}`
            this.query.nextPage++
            let data = await this.queryAPI(url)
            
            return data
        }
    }

    //Remove any duplicates based on imdbID being unique
	//Function from https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
	static removeDuplicates (movies) {
		if (!movies) return
			
		const uniqueMovies = Array.from(new Set(movies.map(a => a.imdbID)))
		 .map(imdbID => {
		   return movies.find(a => a.imdbID === imdbID)
		 })
		 return uniqueMovies
	}
}

export default HandleAPI