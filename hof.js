const hofSection = document.getElementById("hof-section")

window.onload = load()

document.addEventListener("click", function(e){
    if(e.target.id === "home"){
        window.location.href = "index.html"
    }
})

function load(){
    const hofHtmlStrings = localStorage.getItem("hofHtml")
    console.log(hofHtmlStrings)
    hofSection.innerHTML =`${hofHtmlStrings}`
}