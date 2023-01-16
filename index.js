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
            postSearch.style.display = "grid"
            preSearch.style.display = "none"
            } else{
                postSearch.style.display = "none"
                preSearch.style.display = "flex"
                preSearch.innerHTML = `<h1>Sorry cinema lover! <br>We couldn't find any media matching that title</h1>`
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
                        <img class="film-poster" src="${data.Poster}">
                    <div class="title-rating-wpr">
                        <h1 class="film-title">${data.Title}</h1>
                        <p1 class="film-rating"><span><i class="fa-solid fa-star"></i></span>${data.imdbRating}</p1>
                    </div>
                    <p1 class="film-runtime">${data.Runtime}</p1>
                    <p1 class="film-genre">${data.Genre}</p1>
                    <button class="add-to-watchlist"><i class="fa-solid fa-circle-plus"></i>Hall of Fame</button>
                    <p1 class="plot">${data.Plot}</p1>
                </div>
    `   
        postSearch.innerHTML = `${listsHtml}`
        })
        
    })
    
}
