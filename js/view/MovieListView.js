class MovieListView {
    constructor(controller){
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click',(event)=>this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.ratingListener(event));
        
    }

    detailViewBtnListener(event){
        event.preventDefault();
        
        const targetEle = event.target;
        if(targetEle && targetEle.parentNode.classList.contains('detail-view-button')){
            const movieId = targetEle.parentNode.dataset.id;            
            this.controller.displayDetail(movieId);
        }
    }

    ratingListener(event){
        const targetEle = event.target;
        const ratingValue = targetEle.dataset.value;
        const targetMovieId = targetEle.parentNode.id;
        if(targetEle && targetEle.parentNode.classList.contains('star-wrapper')){
            console.log("rating star",ratingValue);
            console.log("rating star movieid",targetMovieId);
            this.controller.storeRating(targetMovieId, ratingValue);
        }
    }

    getItemTemplate(object){
        const result = this.itemTemplate
        .replace("{{this.title}}",object.title)
        .replace("{{this.poster}}",`https://image.tmdb.org/t/p/w400/${object.poster}`)
        .replace("{{this.overview}}",this.getExcerptWords(object.overview))
        .replace("{{this.id}}",object.id)
        .replace("{{this.rateid}}",object.id)
        .replace("{{ratevalue}}",object.rating);
        return result;
    }  // create movie templates to display movie lists

    getExcerptWords(mainString){
        const sliced = mainString.slice(0,100)
        const split = sliced.split(" ");
        split.splice(-1,1);
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