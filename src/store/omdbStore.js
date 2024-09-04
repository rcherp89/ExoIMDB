export class omdbStore {

    async getMovieById(ids) {

        let result = []
        for (const id of ids) {
            const endpoint = `http://www.omdbapi.com/?i=${id}&apikey=dea1ccc0`
            try {
                const res = await fetch(endpoint)
                if (!res.ok) throw `${res.statusText} - ${res.status}`
                result.push(await res.json()) 
            } catch (err) {
                console.log("error fetching " + id)
            }
        }
        return result
    }
}