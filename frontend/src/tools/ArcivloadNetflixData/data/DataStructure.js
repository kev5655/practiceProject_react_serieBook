"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episodes = void 0;
var Films = /** @class */ (function () {
    function Films() {
        var _this = this;
        this.add = function (film) {
            _this.filmArray.push(film);
        };
        this.filmArray = [];
    }
    return Films;
}());
var Episodes = /** @class */ (function () {
    function Episodes() {
        var _this = this;
        this.add = function (episode) {
            _this.episodes.push(episode);
        };
        this.getEpisodeGroups = function () {
            for (var i = 0; i < _this.episodes.length; i++) {
                var episode = _this.episodes[i];
                var foundedEpisode = _this.getEpisodeGroupByName(episode.getName(), _this.episodeGroups);
                if (foundedEpisode === undefined) {
                    _this.episodeGroups.push(new EpisodeGroup(episode.getName(), episode.getData(), episode.getDate()));
                }
                else {
                    foundedEpisode.addDataToArray(episode.getData());
                    foundedEpisode.addDateToArray(episode.getDate());
                }
            }
            return _this.episodeGroups;
        };
        this.getEpisodeGroupByName = function (episodeName, group) {
            return group.find(function (element) {
                return element.getName() === episodeName;
            });
        };
        this.episodes = [];
        this.episodeGroups = [];
    }
    return Episodes;
}());
exports.Episodes = Episodes;
var Episode = /** @class */ (function () {
    function Episode(allData) {
        var _this = this;
        this.date = new Date();
        this.getName = function () {
            return _this.allDataArray[0];
        };
        this.getData = function () {
            var data = _this.allDataArray;
            delete data[0];
            delete data[data.length - 1];
            return data;
        };
        this.getDate = function () {
            return _this.date;
        };
        this.allData = allData;
        this.allDataArray = allData.split(/[:,]+/); // Split by : and ,
        this.date = new Date(this.allDataArray[this.allDataArray.length - 1]);
    }
    return Episode;
}());
;
var EpisodeGroup = /** @class */ (function () {
    function EpisodeGroup(name, data, date) {
        var _this = this;
        this.getName = function () {
            return _this.name;
        };
        this.addDataToArray = function (data) {
            _this.data.push(data);
        };
        this.addDateToArray = function (date) {
            _this.dates.push(date);
        };
        this.name = name;
        this.data = [];
        this.data.push(data);
        this.dates = [];
        this.dates.push(date);
    }
    return EpisodeGroup;
}());
var Series = /** @class */ (function () {
    function Series() {
    }
    return Series;
}());
var Serie = /** @class */ (function () {
    function Serie() {
    }
    return Serie;
}());
// const dataStructure = {
//     films: new Films(),
//     sd: {
//         Episodes,
//         Series
//     }
// }
