import APIDataModel from "./APIModel.js";
import YTSData from "./YTSAPIModel.js";

class MovieListModel extends APIDataModel {
   
    getUpcomingApiUrl(key){
        return this.rootURL + this.upcoming_path.replace("<<api_key>>",key);
    }

    async fetchUpcomingMovie(key){
        const fetchedData = await fetch(this.getUpcomingApiUrl(key));
        const jsonData = await fetchedData.json();
        return jsonData.results;
    }

    get favMovies() {
        const winners = localStorage.getItem("favouriteMovies");
        if (winners !== null) {
            return JSON.parse(winners);
        }

        return [];
    }
    set favMovies(value) {
        const stringifyValue = JSON.stringify(value);
        localStorage.setItem('favouriteMovies', stringifyValue);
    }
}

export default MovieListModel;