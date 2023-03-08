const storageKey = 'hofIds';
const hofSection = document.getElementById("hof-section")
let imdbIds;
const preAdd = document.getElementById("pre-add")



window.onload = load()

document.addEventListener("click", function(e){
    if(e.target.id === "home"){
        window.location.href = "index.html"
    }
}) 

function load() {
    
    let json = localStorage.getItem(storageKey);
    
    if (json) {
        imdbIds = JSON.parse(json)
    } else {
        imdbIds = [];
    }

    renderHof();
}



function renderHof() {
    if (imdbIds.length === 0) {
        preAdd.style.display = "flex";
    } else {
        preAdd.style.display = "none";
    }
    hofSection.innerHTML = '';
    
    imdbIds.forEach(function(imdbId) {
        fetch(`https://www.omdbapi.com/?apikey=31a874b3&i=${imdbId}`)
            .then(res => res.json())
            .then(data => {
                hofSection.insertAdjacentHTML('beforeend', `
                    <div class="film-wpr">
                        <img class="film-poster" src="${data.Poster === "N/A" ? "images/noImage.png"  : data.Poster }">
                    <div class="title-rating-wpr">
                        <h1 class="film-title">${data.Title}</h1>
                        <p1 class="film-rating"><span><i class="fa-solid fa-star"></i></span>${data.imdbRating}</p1>
                    </div>
                    <p1 class="film-runtime">${data.Runtime}</p1>
                    <p1 class="film-genre">${data.Genre}</p1>
                    <button class="remove-from-hof" data-imdb-id="${data.imdbID}"><i class="fa-solid fa-circle-minus"></i>Media Database</button>
                    <p1 class="plot">${data.Plot}</p1>
                </div>
                `);                
            })
        
    });
}

document.addEventListener("click", function(e){
    if(e.target.classList.contains("remove-from-hof")){
        
        imdbIds.splice(imdbIds.indexOf(e.target.dataset.imdbId), 1)
        localStorage.setItem(storageKey, JSON.stringify(imdbIds))
        renderHof()
    }

})