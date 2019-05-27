console.log("file is giving data")

fetch("https://api.darksky.net/forecast/65a8793abeffee0025fede15c6b4d1d2/6,5").then(
    (response)=>{
        response.json().then(
            (data)=>{
                console.log(data)
            })
})