let searchInput = document.getElementById("search-input")
const preSearch = document.getElementById("pre-search")
const postSearch = document.getElementById('post-search')
const form = document.getElementById("search-form")

let searchInputValue = ''

form.addEventListener("submit", async function(event) {
    searchInputValue = searchInput.value.replace(' ', '+')
    event.preventDefault()
    // Fetch a list of movies/data
    // turn off pre-search modal
    const res = await fetch(`https://www.omdbapi.com/?apikey=31a874b3&s=${searchInputValue}`)
    const data = await res.json()
        if (data.Response === 'True') {
            getMovieFromApi(data.Search)
            preSearch.style.display = "none"
            } else{
                console.log("No Matching Films")
            }
   
})

function getMovieFromApi(moviesArray){
    let listsHtml = ``
    moviesArray.forEach(function(movie){
            fetch(`https://www.omdbapi.com/?apikey=31a874b3&i=${movie.imdbID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            listsHtml += `
                <div class="film-wpr">
                    <div id="poster-wpr" class="film-poster-wpr">
                        <img src="${data.Poster}">
                    </div>
                    <div class="title-rating-wpr">
                        <h1 class="film-title">${data.Title}</h1>
                        <p1 class="film-rating"><span><i class="fa-solid fa-star"></i></span>${data.imdbRating}</p1>
                    </div>
                    <p1 class="film-runtime">${data.Runtime}</p1>
                    <p1 class="film-genre">${data.Genre}</p1>
                    <button class="add-to-watchlist"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
                    <p1 class="plot">${data.Plot}</p1>
                </div>
    `   
        postSearch.innerHTML = `${listsHtml}`
        })
        
    })
    
}
