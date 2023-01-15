let searchInput = document.getElementById("search-input")
const preSearch = document.getElementById("pre-search")
const postSearch = document.getElementById('post-search')

document.addEventListener("click", function(event) {
    event.preventDefault()
  event.stopPropagation()
  if (event.target.matches(".fa-magnifying-glass") || event.target.matches(".search-btn-2")) {
      let searchInputValue = searchInput.value
      preSearch.style.display = "none"
        fetch(`https://www.omdbapi.com/?s=${searchInputValue}&&apikey=88275857`)
    .then(res => res.json())
    .then(data => getFilmsId(data.Search))
  }
});

function getFilmsId(filmsArray){
    
    filmsArray.forEach(function(films){
        getFilmsData(films.Title)
        console.log(films.Poster)

    })
}

function getFilmsData(titles){
            fetch(`https://www.omdbapi.com/?t=${titles}&&apikey=88275857`)
    .then(res => res.json())
    .then(data => renderFilmsData(data))
}

function renderFilmsData(filmData){
    postSearch.innerHTML += `
    <div class="film-wpr">
        <div class="film-poster"></div>
        <div class="title-rating-wpr">
            <h1 class="film-title">${filmData.Title}</h1>
            <p1 class="film-rating">8/10</p1>
        </div>
        <p1 class="film-runtime">${filmData.Runtime}</p1>
        <p1 class="film-genre">${filmData.Genre}</p1>
        <button class="add-to-watchlist">Watchlist</button>
        <p1 class="plot">${filmData.Plot}</p1>
    </div>
    `
}

function dealWithData(url){
   const filmPoster = document.getElementById("film-poster")
   filmPoster.innerHTML = `<img src="${url}"`
}

