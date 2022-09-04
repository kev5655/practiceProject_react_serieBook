
import axios from "axios"

let url = " https://api.tvmaze.com";
let searchUrl = "/search/shows?q="

let searchValue = "Attack on Titan"

axios.get(url + searchUrl + searchValue).then(function (response) {
    let incomingData = response.data;
    console.log(incomingData);

    incomingData.map((data) => {
        console.log(data.show.id)
    })

}).catch(function (error) {
    console.log(error);
});