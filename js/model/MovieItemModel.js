import APIDataModel from "./APIModel.js";

class Movie extends APIDataModel {
    constructor(id, title, poster, overview, link, rating) {
        super();
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.overview = overview;
        this.link = link;
        this.rating = rating;
    }


    getDetailApiUrl(movie_id, key) {
        return this.generateURL(this.detail_path, movie_id, key);
    }

    getVideoApiURL(movie_id, key) {
        return this.generateURL(this.videos_path, movie_id, key);
    }

    generateURL(rawPath, movie_id, key) {
        return this.rootURL + rawPath.replace("{movie_id}", movie_id).replace("<<api_key>>", key);
    }

    async fetchMovieDetail(movie_id, key) {
        //Get movie detail
        const fetchResult = await fetch(this.getDetailApiUrl(movie_id, key));
        const jsonData = await fetchResult.json();
        console.log(jsonData);

        //Get videos of the current movie
        const fetchVideo = await fetch(this.getVideoApiURL(movie_id, key));
        const videoJsonData = await fetchVideo.json();
        console.log(videoJsonData);

        const convertedPromise = this.updateData(jsonData, videoJsonData.results);
        return convertedPromise;
    }

    updateData(data, videos) {
        console.log(data);
        this.id = data.id;
        this.title = data.original_title;
        this.poster = data.backdrop_path;
        this.overview = data.overview;
        this.videos = videos;
        return this;
    }

    setRating(movieId, rateValue) {
        localStorage.setItem(movieId, rateValue);
    }

    setFavourite(movieId, favouriteValue) {
        localStorage.setItem(movieId, favouriteValue);
    }

    removeFavourite(movieId){
        localStorage.removeItem(movieId);
    }

    favouriteStorage() {

        var archive = {},
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            let fav = keys[i].slice(7);
            // console.log("kk : ", kk);
            if (fav === "favourite") {
                archive[keys[i]] = localStorage.getItem(keys[i]);
            }
        }

        return archive;
    }

    ratingStorage() {

        var archive = {}, // Notice change here
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            if ((keys[i].length == 6)) {
                archive[keys[i]] = localStorage.getItem(keys[i]);
            }
        }
        return archive;
    }
}

export default Movie;