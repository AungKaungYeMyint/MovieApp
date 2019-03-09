class MovieListView {
    constructor(controller) {
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.favouriteTemplate = document.getElementById("favourite-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click', (event) => this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.ratingListener(event));
        this.viewport.addEventListener('click', (event) => this.favouriteListener(event));
    }

    detailViewBtnListener(event) {
        event.preventDefault();

        const targetEle = event.target;
        if (targetEle && targetEle.parentNode.classList.contains('detail-view-button')) {
            const movieId = targetEle.parentNode.dataset.id;
            this.controller.displayDetail(movieId);
        }
    }

    ratingListener(event) {
        const targetEle = event.target;
        const ratingValue = targetEle.dataset.value;
        const targetMovieId = targetEle.parentNode.id;
        if (targetEle && targetEle.parentNode.classList.contains('star-wrapper')) {
            this.controller.storeRating(targetMovieId, ratingValue);
            this.controller.changeStar();
        }
    }

    favouriteListener(event){
        const targetEle = event.target;
        const heartValue = targetEle.dataset.value;
        if(targetEle && targetEle.parentNode.classList.contains('heart-wrapper')){
            // console.log("favourite thing : ", targetEle.dataset.block);
            // console.log("fa movie id : ", targetEle.parentNode.id);
            // this.controller.storeFavourite(targetEle.parentNode.id,heartValue);
            this.controller.changeFavourite();
        }
    }

    getItemTemplate(object) {
        const result = (this.itemTemplate
            .replace("{{this.title}}", object.title)
            .replace("{{this.poster}}", `https://image.tmdb.org/t/p/w400/${object.poster}`)
            .replace("{{this.overview}}", this.getExcerptWords(object.overview))
            .replace("{{this.id}}", object.id)
            .replace("{{this.rateid}}", object.id)
            .replace("{{ratevalue}}", object.rating)
            .replace("{{empty_star1}}", object.id)
            .replace("{{empty_star2}}", object.id)
            .replace("{{empty_star3}}", object.id)
            .replace("{{empty_star4}}", object.id)
            .replace("{{empty_star5}}", object.id)
            .replace("{{favourite-template}}",this.favouriteTemplate)
            .replace("{{heart.movie_id}}",object.id)
            .replace("{{heart.id}}",object.id));
        return result;
    }  // create movie templates to display movie lists

    getExcerptWords(mainString) {
        const sliced = mainString.slice(0, 100)
        const split = sliced.split(" ");
        split.splice(-1, 1);
        const joined = split.join(" ");
        return joined + "...";
    }

    render(templates) {
        document.documentElement.scrollTop = 0;
        this.viewport.innerHTML = "";
        for (let template of templates) {
            this.viewport.innerHTML += template;
        }
    } // movie list render

}

export default MovieListView;