//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//let data = require("fs").readFileSync("NetflixViewingHistory_Kevin.csv", "utf8");

// const dataStructur = {
//     films: [String...],
//     series: [{
//         episodes: [{
//             data: String,
//             dataArray: [String...], //Splitting by ":" or ","
//             name: String,
//             session: int = null,
//             episode: int = null
//             date: new Date,
//
//         }],
//         serie: {
//             name: String,
//             session: int,
//             episode: int,
//             stars: 0,
//             startDate: new Date,
//             endDate: new Date,
//             createdDate: new Date(Date.now()),
//             lastModifiedDate: new Date(Date.now()),
//         }
//     }]
// }


const {readFileSync} = require('fs');
const {Episodes, Episode} = require("./data/DataStructure");

const main = () => {
    const entity = deleteArrayElement(readCsvFile("NetflixViewingHistory_Kevin.csv"), 0);
    const episode = filterSeries(entity);

    //console.log(episode)

    let episodes = new Episodes();

    for (const episodeElement of episode) {
        episodes.add(new Episode(episodeElement))
    }
    let episodeGroup = episodes.getEpisodeGroups()
    console.log(episodeGroup);

}

const readCsvFile = (path: string): string[] => {
    try {
        return readFileSync(path, 'utf-8').split("\n");
    } catch (err) {
        throw new Error("File wurde nicht gefunden");
    }
}

const deleteArrayElement = (arr, index) => {
    arr.splice(index, 1);
    return arr;
}

const filterSeries = (listOfEntity: string[]):string[] => {
    let saves = [];
    let episode: string[] = [];
    let films: string[] = [];

    for (const element of listOfEntity) {
        const name = element.split(":")[0];
        const foundSave = saves.find(save => save.name === name)
        if(foundSave === undefined) {
            saves.push({name:name, elements: [element], n: 1});
        }else {
            foundSave.n++;
            foundSave.elements.push(element)
        }
    }
    
    for(const save of saves){
        if(save.n > 1){
            for(const element of save.elements){
                episode.push(element);
            }
        }else {
            for(const element of save.elements){
                films.push(element);
            }
        }
    }

    return episode;
}


main();