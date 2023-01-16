let searchInput = document.getElementById("search-input")
const preSearch = document.getElementById("pre-search")
const postSearch = document.getElementById('post-search')
let html1 = ``
let html2 = []
let urlArray = []
let filmsData = ''

document.addEventListener("click", function(event) {
    event.preventDefault()
  event.stopPropagation()
  if (event.target.matches(".fa-magnifying-glass") || event.target.matches(".search-btn-2")) {
      let searchInputValue = searchInput.value
      preSearch.style.display = "none"
      html1 = ``;
        fetch(`https://www.omdbapi.com/?apikey=31a874b3&s=${searchInputValue}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        getFilmsId(data.Search)
        })
  }
})

function getFilmsId(filmsArray){
    urlsArray = []
    let titlesArray = []
    filmsArray.forEach(function(films){
        urlsArray.push(films.Poster)
        titlesArray.push(films.Title)
    })
    getFilmsData(titlesArray, urlsArray)
    // console.log(urlsArray)
}

function getFilmsData(array1, array2){
    let filmData = ""
    array1.forEach(async function(title){
        const res = await fetch(`https://www.omdbapi.com/?t=${title}&&apikey=88275857`)
    const data = await res.json()
    .then(data => {
        filmsData += data
        htmlIfy2(html2, data)
        })     
    }) 
    array2.forEach(function(url){
        let imgHtml = `<img src="${url}" class="poster">`
        html2.push(imgHtml)
    })

    
}

function htmlIfy2(array, filmData){
    array.forEach(function(urls){
        html1 += `
    <div class="film-wpr">
        <div id="poster-wpr" class="film-poster-wpr">
        ${urls}
        </div>
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
    })
     render(html1)   
}



function render(htmlStrings){
    postSearch.innerHTML = `${htmlStrings}`
}
