//Contain all API related functions
class HandleAPI {
    static isLoading = false

    //Return load status
    static getLoadStatus () {
        return this.isLoading
    }

    //Query API and return response if received
    static async queryAPI (url) {
        let data = []
        this.isLoading = true
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