const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let data = require("fs").readFileSync("Serien.csv", "utf8");

function findStars (value) {
    if(value.indexOf("*") === -1) return null;
    return value;
}

function findDates (rawCSV) {
    let dates = []
    for(let i in rawCSV){
        if(rawCSV[i].indexOf(".") !== -1){
            let dateSplited = rawCSV[i].split(".")
            let date = new Date("20" + dateSplited[2], dateSplited[1], dateSplited[0])
            dates.push(date); //.replaceAll(".", "/")
        }
    }
    return dates;
}

let saveSerieIntoDB = async (addSerie) => {
    let response = await fetchData("http://localhost:8081/api/serie/add",
        "Post",
        JSON.stringify(addSerie),
        'application/json')
    return response.id
}

async function fetchData(url, methode, body, contentType) {
    let rawResponse = await fetch(
        "" + url, { //http://localhost:8081 http://localhost:8081
            method: methode,
            headers: {
                'Content-Type': contentType,
                'Authorization': "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZpbiIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiIvYXBpL2xvZ2luIiwiZXhwIjoxNjY2NzIwODM3fQ.b8jrrS0rxN4JRh0GumSYEsT7qad4yHiG3oIcgMTEkYs"
            },
            body: body
        });
    if (rawResponse.ok) {
        try {
            return await rawResponse.json()
        } catch (exception) {
            return null;
        }
    }
    throw new Error("Failed Fetch Data from Url: " + url + " / " + methode + " / " + body);
}

data = data.split("\r\n")
let series = []
async function sendDate () {
    for (let i in data) {
        let csvSerie = data[i].split(",");
        data[i] = csvSerie;

        let startDate = "";
        let endDate = "";
        let stars = "";

        let dates = findDates(csvSerie);
        if (dates.length !== 0) {
            startDate = new Date(dates[0]);
            if (dates.length >= 2) {
                endDate = new Date(dates[1]);
            }
        }

        for (let i in csvSerie) {
            let rawStars = findStars(csvSerie[i]);
            if (rawStars !== null) {
                stars = parseInt(rawStars.replace(/[^0-9]/g, ''))
            }
        }

        let serie = {
            title: csvSerie[0],
            session: csvSerie[1].replace("S", ""),
            episode: csvSerie[2].replace("E", ""),
            startDate: startDate,
            endDate: endDate,
            createdDate: new Date(Date.now()),
            lastModifiedDate: new Date(Date.now()),
            stars: stars
        }
        series.push(serie);
        await saveSerieIntoDB(serie);
    }
}
sendDate().then(r => {
    for(let i in series){
        console.log(i)
        console.log(series[i])
    }
});
//console.log(series)





