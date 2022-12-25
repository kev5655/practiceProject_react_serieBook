import {Episode} from "./Episode.js";
import {ifError} from "assert";

export class EpisodeGroup {

    private readonly name: string;
    private readonly data: string[][];
    private readonly dates: Date[];
    private episodes: Episode[] = []
    private static episodeGroups: EpisodeGroup[] = [];

    private rawData: string[][] = [];

    private constructor(episode: Episode) {
        this.name = episode.getName()
        this.data = [];
        this.data.push(episode.getData());
        this.dates = [];
        this.dates.push(episode.getDate())
        this.episodes.push(episode)
        this.rawData.push(episode.getAllData())
        EpisodeGroup.episodeGroups.push(this);
    }

    static getInstance = (episode: Episode): EpisodeGroup => {
        const foundedEpisode: EpisodeGroup | undefined = this.findGroupByName(episode.getName());
        if (foundedEpisode !== undefined) {
            foundedEpisode.addDataToArray(episode.getData())
            foundedEpisode.addDateToArray(episode.getDate());
            foundedEpisode.addAllDataToArray(episode.getAllData())
            foundedEpisode.addEpisodeToEpisodes(episode);
            return foundedEpisode;
        }
        return new EpisodeGroup(episode)
    }
    //ToDo Problem bie Black Lagoon
    shrinkData = () => {
        let minLength = Infinity;
        this.data.forEach((data) => {
            if (minLength >= data.length) {
                minLength = data.length
            }
        })
        let allDataHasTheSameLength = false
        while (!allDataHasTheSameLength) {
            allDataHasTheSameLength = true
            this.data.forEach((data, index) => {
                let nextData = this.data[index] ?? [""]
                if (data.length > minLength ) { //&& data[0] !== nextData[0]
                    data[data.length - 2] = data[data.length - 2] + "," + data[data.length - 1]
                    data.pop()
                }
                if (data.length !== minLength) {
                    allDataHasTheSameLength = false
                }
            })
        }
        this.rawData = this.rawData.map((raw, index) => {
            return raw = [this.name, ...this.data[index], this.dates[index].toLocaleString()]
        })

    }

    getName = (): string => {
        return this.name;
    }

    getFirstDate = (): Date => {
        return new Date(Math.min.apply(null, this.dates));
    }

    getLastDate = (): Date => {
        return new Date(Math.max.apply(null, this.dates));
    }

    getDates = (): Date[] => {
        return this.dates;
    }

    getData = (): string[][] => {
        return this.data;
    }

    getDataAndDates = (): (string | Date)[][] => {
        let dataAndDates: (string | Date)[][] = []
        this.episodes.forEach((episode) => {
            dataAndDates.push([...episode.getData(), episode.getDate()])
        })
        return dataAndDates;
    }

    getEpisodes = (): Episode[] => {
        return this.episodes;
    }

    getEpisodeGroups = (): EpisodeGroup[] => {
        return EpisodeGroup.episodeGroups
    }

    getRawData = (): string[][] => {
        return this.rawData;
    }

    static getEpisodeByName = (name: string): EpisodeGroup => {
        let episodeGroup: EpisodeGroup | undefined = this.findGroupByName(name);
        if (episodeGroup === undefined) throw new Error("Episodegroup not Found by name: " + name);
        return episodeGroup;
    }

    static getEpisodeGroups(): EpisodeGroup[] {
        return this.episodeGroups;
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

    addAllDataToArray = (allData: string[]) => {
        this.rawData.push(allData)
    }

    addEpisodeToEpisodes = (episode: Episode) => {
        this.episodes.push((episode))
    }

}