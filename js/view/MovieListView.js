class MovieListView {
    constructor(controller) {
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click', (event) => this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.ratingListener(event));

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
            // console.log("rating star",ratingValue);
            // console.log("rating star movieid",targetMovieId);
            this.controller.storeRating(targetMovieId, ratingValue);
            this.rateMovie(event);
        }
    }

    getItemTemplate(object) {
        const result = this.itemTemplate
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
            .replace("{{empty_star5}}", object.id);
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
            // console.log(template);
            // this.rateMovie();
            this.viewport.innerHTML += template;
        }
    } // movie list render

    // findString(string, array){
    //     console.log(string);
    //     if(array.indexOf(string)){
    //         return array.indexOf(string);
    //     }
    // }

    rateMovie() {
        let array = this.controller.getLocalData();
        console.log(array);
        for(let i in array){
            console.log("index : ", i);
            console.log("value : ",array[i]);
            for(let j = 1; j <= array[i]; j++){
                let fillStar = document.getElementById(i + "_" + j);
                fillStar.className = "fas fa-star";
            }
            // console.log("target : ",event.target);
            // let targetEle = event.target;
            // console.log(targetEle.className);
            // if(targetEle.className == 'far fa-star'){
            //     targetEle.className = "fas fa-star";
            // }else{
            //     targetEle.className = "far fa-star";
            // }
            
            // this.ratingListener(event);
        }
    }

    // if(fillStar.childNodes.classList.contains("far fa-star")){
    //     fillStar.className = "fas fa-star";
    // }else{
    //     fillStar.className = "far fa-star";
    // }

}

export default MovieListView;