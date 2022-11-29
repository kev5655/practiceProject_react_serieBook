import {Episode} from "./Episode.js";

export class EpisodeGroup {

    private readonly name: string;
    private readonly data: string[][];
    private readonly dates: Date[];
    private episodes: Episode[] = []
    private static _episodeGroups: EpisodeGroup[] = [];

    private rawData: string[][] = [];

    private constructor(episode: Episode) {
        this.name = episode.getName()
        this.data = [];
        this.data.push(episode.getData());
        this.dates = [];
        this.dates.push(episode.getDate())
        this.episodes.push(episode)
        this.rawData.push(episode.getAllData())
        EpisodeGroup._episodeGroups.push(this);
    }

    static getInstance = (episode: Episode): EpisodeGroup => {
        const foundedEpisode: EpisodeGroup | undefined = this.findGroupByName(episode.getName());
        if(foundedEpisode !== undefined){
            foundedEpisode.addDataToArray(episode.getData())
            foundedEpisode.addDateToArray(episode.getDate());
            foundedEpisode.addAllDataToArray(episode.getAllData())
            foundedEpisode.addEpisodeToEpisodes(episode);
            return foundedEpisode;
        }
        return new EpisodeGroup(episode)
    }

    getName = ():string => {
        return this.name;
    }

    getFirstDate = ():Date => {
        return new Date(Math.min.apply(null, this.dates));
    }

    getLastDate = ():Date => {
        return new Date(Math.max.apply(null, this.dates));
    }

    getDates = ():Date[] => {
        return this.dates;
    }

    getData = ():string[][] => {
        return this.data;
    }

    getDataAndDates = ():(string|Date)[][] => {
        let dataAndDates: (string|Date)[][] = []
        this.episodes.forEach((episode) => {
            dataAndDates.push([...episode.getData(), episode.getDate()])
        })
        return dataAndDates;
    }

    getEpisodes = ():Episode[] => {
        return this.episodes;
    }

    getEpisodeGroups = ():EpisodeGroup[] => {
        return EpisodeGroup._episodeGroups
    }

    getRawData = (): string[][] => {
        return this.rawData;
    }

    static getEpisodeByName = (name: string): EpisodeGroup => {
        let episodeGroup: EpisodeGroup | undefined = this.findGroupByName(name);
        if(episodeGroup === undefined) throw new Error("Episodegroup not Found by name: " + name);
        return episodeGroup;
    }

    static getEpisodeGroups(): EpisodeGroup[] {
        return this._episodeGroups;
    }

    private static findGroupByName = (name: string): EpisodeGroup | undefined => {
        return EpisodeGroup._episodeGroups.find((group) => {
           return group.getName() === name
        });
    }

    addDataToArray = (data: string[]) => {
        this.data.push(data);
    }

    addDateToArray = (date: Date) => {
        this.dates.push(date);
    }

    addAllDataToArray = (allData: string[]) => {
        this.rawData.push(allData)
    }

    addEpisodeToEpisodes = (episode: Episode) => {
        this.episodes.push((episode))
    }

}