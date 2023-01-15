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
    })
}

function getFilmsData(titles){
            fetch(`https://www.omdbapi.com/?t=${titles}&&apikey=88275857`)
    .then(res => res.json())
    .then(data => renderFilmsData(data))
}

function renderFilmsData(filmData){
    // console.log(filmData)
    // console.log("Title:", filmData.Title)
    // console.log("Ratings:", filmData.Ratings)
    // console.log("Runtime:", filmData.Runtime)
    // console.log("Genre:", filmData.Genre)
    // console.log("Plot:", filmData.Plot)
    postSearch.innerHTML += `
    <div class="film-wpr">
        <img class="film-poster" scr="${filmData}">
        <h1 class="film-title">${filmData.Title}</h1>
        <p1 class="film-rating">8/10</p1>
        <p1 class="film-runtime">${filmData.Runtime}</p1>
        <p1 class="film-genre">${filmData.Genre}</p1>
        <button class="add-to-watchlist">Watchlist</button>
        <textarea class="plot">${filmData.Plot}</textarea>
    </div>
    `
}
