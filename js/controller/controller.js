import MovieListModel from '/js/model/MovieListModel.js';
import MovieItemModel from '/js/model/MovieItemModel.js';
import MovieListView from '../view/MovieListView.js';
import MovieDetailView from '../view/MovieDetailView.js';

class Controller {
    constructor() {

        this.movieListModel = new MovieListModel();
        this.movieListView = new MovieListView(this);
        this.movieDetailView = new MovieDetailView(this);
        this.movieItemModel = new MovieItemModel();
        this.movieObjects = [];

    }
    async init() {

        const movieData = await this.movieListModel
            .fetchUpcomingMovie(this.movieListModel.key);
        // console.log(movieData);

        const movieObjects = await this.getUpcomingMovieData(movieData);
        console.log("movie Item object", movieObjects);

        this.displayMovieList(movieObjects);
        this.changeStar();
    }

    async displayDetail(id) {
        const detailObject = await this.movieItemModel
            .fetchMovieDetail(id, this.movieItemModel.key);
        console.log(detailObject);

        this.movieDetailView.render(detailObject);
    }

    displayMovieList(movieObjects) {
        const templates = [];
        for (let movieObj of movieObjects) {
            movieObj.updateFavourite(this.movieListModel.favMovies);
            // console.log("ff",this.movieListModel.favMovies);
            templates.push(this.movieListView.getItemTemplate(movieObj));
            console.log("template : ", templates);

        }
        this.movieListView.render(templates);
    }

    changeListView() {
        this.displayMovieList(this.movieObjects);
    }

    getUpcomingMovieData(data) {
        this.movieObjects = [];
        for (let movie of data) {
            let rating = 0;
            const isFav = this.movieListModel.favMovies.includes(movie.id.toString());
            if (localStorage.getItem(movie.id)) {
                rating = localStorage.getItem(movie.id);
            }
            const movieObj = new MovieItemModel(movie.id, movie.title, movie.poster_path, movie.overview, "", rating, isFav);
            this.movieObjects.push(movieObj);
        }
        return this.movieObjects;
    } //*** 

    storeRating(movieId, rateValue) {
        this.movieItemModel.setRating(movieId, rateValue);
    }

    getRatingData() {
        const array = this.movieItemModel.ratingStorage();
        return array;
    }

    changeStar() {
        let array = this.getRatingData();
        console.log("rating array : ", array);
        for (let i in array) {
            console.log("star array : ", array[i]);
            for (let k = 1; k <= 5; k++) {
                let fillStar = document.getElementById(i + "_" + k);
                fillStar.className = "far fa-star";
            }
        }
        for (let i in array) {
            for (let j = 1; j <= array[i]; j++) {
                let fillStar = document.getElementById(i + "_" + j);
                fillStar.className = "fas fa-star";
            }
        }
    }

    favouriteMovie(id) {
        const favMovies = this.movieListModel.favMovies;
        console.log("favMovies : ",favMovies);
        if (!favMovies.includes(id)) {
            favMovies.push(id);
        }
        else {
            favMovies.splice(favMovies.indexOf(id), 1);
        }
        this.movieListModel.favMovies = favMovies;

        this.displayMovieList(this.movieObjects);
        this.changeStar();
    }

}

export default Controller;