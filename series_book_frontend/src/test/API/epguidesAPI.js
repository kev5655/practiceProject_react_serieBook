
import axios from "axios"

var url = " https://api.tvmaze.com";
var searchUrl = "/search/shows?q="

var searchValue = "Attack on Titan"

axios.get(url + searchUrl + searchValue).then(function (response) {
    let incomingData = response.data;
    console.log(incomingData);

    incomingData.map((data) => {
        console.log(data.show.id)
    })

}).catch(function (error) {
    console.log(error);
});