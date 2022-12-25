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
var readFileSync = require('fs').readFileSync;
var _a = require("./data/DataStructure"), Episodes = _a.Episodes, Episode = _a.Episode;
var main = function () {
    var entity = deleteArrayElement(readCsvFile("NetflixViewingHistory_Kevin.csv"), 0);
    var episode = filterSeries(entity);
    //console.log(episode)
    var episodes = new Episodes();
    for (var _i = 0, episode_1 = episode; _i < episode_1.length; _i++) {
        var episodeElement = episode_1[_i];
        episodes.add(new Episode(episodeElement));
    }
    var episodeGroup = episodes.getEpisodeGroups();
    console.log(episodeGroup);
};
var readCsvFile = function (path) {
    try {
        return readFileSync(path, 'utf-8').split("\n");
    }
    catch (err) {
        throw new Error("File wurde nicht gefunden");
    }
};
var deleteArrayElement = function (arr, index) {
    arr.splice(index, 1);
    return arr;
};
var filterSeries = function (listOfEntity) {
    var saves = [];
    var episode = [];
    var films = [];
    var _loop_1 = function (element) {
        var name_1 = element.split(":")[0];
        var foundSave = saves.find(function (save) { return save.name === name_1; });
        if (foundSave === undefined) {
            saves.push({ name: name_1, elements: [element], n: 1 });
        }
        else {
            foundSave.n++;
            foundSave.elements.push(element);
        }
    };
    for (var _i = 0, listOfEntity_1 = listOfEntity; _i < listOfEntity_1.length; _i++) {
        var element = listOfEntity_1[_i];
        _loop_1(element);
    }
    for (var _a = 0, saves_1 = saves; _a < saves_1.length; _a++) {
        var save = saves_1[_a];
        if (save.n > 1) {
            for (var _b = 0, _c = save.elements; _b < _c.length; _b++) {
                var element = _c[_b];
                episode.push(element);
            }
        }
        else {
            for (var _d = 0, _e = save.elements; _d < _e.length; _d++) {
                var element = _e[_d];
                films.push(element);
            }
        }
    }
    return episode;
};
main();
