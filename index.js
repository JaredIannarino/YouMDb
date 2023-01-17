
const storageKey = 'hofIds'; // I like to keep this in a constant to avoid "magic strings" in code

let searchInput = document.getElementById("search-input")
const preSearch = document.getElementById("pre-search")
const postSearch = document.getElementById('post-search')
const form = document.getElementById("search-form")
const StartExploring = document.getElementById("start-exploring")
let searchInputValue = ''
let imdbIDs; // don't initialize the value, this will be done on page load

function init() {
    // we like to keep a cache of the item that's in localStorage...
    const json = localStorage.getItem(storageKey);
    
    if(json) {
        imdbIDs = JSON.parse(json)
    } else {
        imdbIDs = []; // if there wasn't an entry in local storage create an empty list
    }
}

form.addEventListener("submit", async function(event) {
    searchInputValue = searchInput.value.replace(' ', '+')
    event.preventDefault()
    // Fetch a list of movies/data
    // turn off pre-search modal
    const res = await fetch(`https://www.omdbapi.com/?apikey=31a874b3&s=${searchInputValue}`)
    const data = await res.json()
        if (data.Response === 'True') {
            getMoviesFromApi(data.Search)
            postSearch.style.display = "grid"
            preSearch.style.display = "none"
            } else{
                postSearch.style.display = "none"
                preSearch.style.display = "flex"
                StartExploring.innerHTML = `<h1>Sorry cinema lover! <br>We couldn't find any media matching that title</h1>`
            }
   
})

document.addEventListener("click", function(e){
    if(e.target.id === "hof"){
        window.location.href = "hof.html"
    }
})


function getMoviesFromApi(moviesArray){
    let listsHtml = ``;
    moviesArray.forEach(function(movie){
            fetch(`https://www.omdbapi.com/?apikey=31a874b3&i=${movie.imdbID}`)
        .then(res => res.json())
        .then(data => {
            listsHtml += `
                <div class="film-wpr">
                        <img class="film-poster" src="${data.Poster}">
                    <div class="title-rating-wpr">
                        <h1 class="film-title">${data.Title}</h1>
                        <p1 class="film-rating"><span><i class="fa-solid fa-star"></i></span>${data.imdbRating}</p1>
                    </div>
                    <p1 class="film-runtime">${data.Runtime}</p1>
                    <p1 class="film-genre">${data.Genre}</p1>
                    <button class="add-to-hof" data-imdb-id="${data.imdbID}"><i class="fa-solid fa-circle-plus"></i>Media Database</button>
                    <p1 class="plot">${data.Plot}</p1>
                </div>
    `   
        postSearch.innerHTML = `${listsHtml}`
        })
    });

    postSearch.addEventListener("click", function(e) {
        if (e.target.classList.contains("add-to-hof")) {
            const imdbId = e.target.dataset.imdbId;
            
            if( !imdbIDs.includes(imdbId)) { // only add the id if it doesn't already exist in the list
                imdbIDs.push(imdbId);
            }
            localStorage.setItem(storageKey, JSON.stringify(imdbIDs))
        }
    });
}

init();
