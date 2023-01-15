fetch(`https://www.omdbapi.com/?s=attack+on+titan&&apikey=88275857`)
    .then(res => res.json())
    .then(data => console.log(data))