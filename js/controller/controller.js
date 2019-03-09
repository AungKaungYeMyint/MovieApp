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
        this.changeFavourite(movieData);
    }

    async displayDetail(id) {
        const detailObject = await this.movieItemModel
            .fetchMovieDetail(id, this.movieItemModel.key);
        console.log(detailObject);

        this.movieDetailView.render(detailObject);
    }

    displayMovieList(movieObjects) {
        const templates = [];
        for (const movieObj of movieObjects) {
            templates.push(this.movieListView.getItemTemplate(movieObj));
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
            if (localStorage.getItem(movie.id)) {
                rating = localStorage.getItem(movie.id);
            }
            const movieObj = new MovieItemModel(movie.id, movie.title, movie.poster_path, movie.overview, "", rating);
            // console.log(movieObj);
            this.movieObjects.push(movieObj);
        }
        return this.movieObjects;
    } //*** 

    storeRating(movieId, rateValue) {
        this.movieItemModel.setRating(movieId, rateValue);
        // this.movieListView.rateMovie();
    }

    storeFavourite(movieId, favouriteValue) {
        this.movieItemModel.setFavourite(movieId, favouriteValue);
    }

    getRatingData() {
        const array = this.movieItemModel.ratingStorage();
        return array;
    }

    getFavouriteData() {
        const array = this.movieItemModel.favouriteStorage();
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

    changeFavourite(movieData) {
        let array = this.getFavouriteData();
        let movieFavourite = [];
        console.log(movieData);
        for (let movie of movieData) {
            movieFavourite.push(movie.id);
        }

        console.log("movieFavourite : ", movieFavourite);

        for (let movie in movieFavourite) {
            for(let i in array){
                let fillHeart = document.getElementById(i.slice(0, 6) + "_fav");
            }
            
            // if(movie.includes(i)){
            //     console.log("movie : ", movie);
            //     // this.movieItemModel.setFavourite(movie)
            // }
        }

        // if()
        // fillHeart.className = "fas fa-heart";


    }
}

export default Controller;