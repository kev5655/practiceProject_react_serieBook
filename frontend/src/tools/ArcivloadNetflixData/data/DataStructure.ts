class Films {
    filmArray: string[];

    constructor() {
        this.filmArray = [];
    }

    add = (film) => {
        this.filmArray.push(film);
    }
}


export class Episodes {
    private episodes: Episode[];
    private episodeGroups: EpisodeGroup[];

    constructor() {
        this.episodes = [];
        this.episodeGroups = [];
    }

    add = (episode: Episode) => {
        this.episodes.push(episode);
    }

    getEpisodeGroups = ():EpisodeGroup[] => {
        for (let i = 0; i < this.episodes.length; i++) {
            let episode:Episode = this.episodes[i];
            const foundedEpisode:EpisodeGroup = this.getEpisodeGroupByName(episode.getName(), this.episodeGroups);
            if (foundedEpisode === undefined) {
                this.episodeGroups.push(new EpisodeGroup(episode.getName(),
                    episode.getData(),
                    episode.getDate()))
            } else {
                foundedEpisode.addDataToArray(episode.getData());
                foundedEpisode.addDateToArray(episode.getDate());
            }
        }
        return this.episodeGroups;
    }

    private getEpisodeGroupByName = (episodeName, group):EpisodeGroup => {
        return group.find((element) => {
            return element.getName() === episodeName;
        })
    }
}

class Episode {
    allData: string;
    allDataArray: string[];
    date: Date = new Date();

    constructor(allData) {
        this.allData = allData;
        this.allDataArray = allData.split(/[:,]+/); // Split by : and ,
        this.date = new Date(this.allDataArray[this.allDataArray.length - 1]);
    }

    getName = ():string => {
        return this.allDataArray[0];
    }

    getData = ():string[] => {
        const data:string[] = this.allDataArray;
        delete data[0];
        delete data[data.length - 1];
        return data;
    }

    getDate = ():Date => {
        return this.date;
    }
};


class EpisodeGroup {
    name: string;
    data: string[][]
    dates: Date[]

    constructor(name: string, data: string[], date: Date) {
        this.name = name;
        this.data = [];
        this.data.push(data);
        this.dates = [];
        this.dates.push(date)

    }

    getName = ():string => {
        return this.name;
    }

    addDataToArray = (data: string[]) => {
        this.data.push(data);
    }

    addDateToArray = (date: Date) => {
        this.dates.push(date);
    }
}

class Series {

}

class Serie {

}

// const dataStructure = {
//     films: new Films(),
//     sd: {
//         Episodes,
//         Series
//     }
// }



