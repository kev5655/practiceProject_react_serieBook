import {Episode} from "./Episode";


export class EpisodeGroup {
    private name: string;
    private data: string[][];
    private dates: Date[];
    private static episodeGroups: EpisodeGroup[] = [];

    private constructor(episode: Episode) { //private name: string, data: string[], date: Date
        this.name = episode.getName()
        this.data = [];
        this.data.push(episode.getData());
        this.dates = [];
        this.dates.push(episode.getDate())
        EpisodeGroup.episodeGroups.push(this);
    }

    static getInstace = (episode: Episode): EpisodeGroup => {
        const foundedEpisode: EpisodeGroup | undefined = this.findGroupByName(episode.getName());
        if(foundedEpisode !== undefined){
            foundedEpisode.addDataToArray(episode.getData())
            foundedEpisode.addDateToArray(episode.getDate());
            return foundedEpisode;
        }
        return new EpisodeGroup(episode)
    }

    getName = ():string => {
        return this.name;
    }

    getMinDate = ():Date => {
        return Math.min.apply(null, this.dates);
    }

    getMaxDate = ():Date => {
        return Math.max.apply(null, this.dates);
    }

    getData = ():string[][] => {
        return this.data;
    }

    getEpisodeGroups = ():EpisodeGroup[] => {
        return EpisodeGroup.episodeGroups
    }

    static getEpisodeByName = (name: string):EpisodeGroup | undefined => {
        return this.findGroupByName(name);
    }

    private static findGroupByName = (name: string): EpisodeGroup | undefined => {
        return EpisodeGroup.episodeGroups.find((group) => {
           return group.getName() === name
        });
    }

    addDataToArray = (data: string[]) => {
        this.data.push(data);
    }

    addDateToArray = (date: Date) => {
        this.dates.push(date);
    }
}