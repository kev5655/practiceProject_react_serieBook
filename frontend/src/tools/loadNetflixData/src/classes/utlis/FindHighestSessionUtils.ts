import {EpisodeGroup} from "../EpisodeGroup.js";
import {Episode} from "../Episode.js";
import {ArrayUtils} from "./ArrayUtils.js";
import {StringUtils} from "./StringUtils.js";

export class FindHighestSessionUtils {

    private static searchParams: string[] = ["Staffel", "Season"];

    public static findHighestSession = (episodeGroup: EpisodeGroup): number => {
        return this.findHighestSessionByNumber(episodeGroup) ??
            this.findHighestSessionByCount(episodeGroup);
    }

    // Count Sessions by search Params
    private static findHighestSessionByNumber = (episodeGroup: EpisodeGroup): number | null => {
        // console.log("Find Highest Session by Number");
        let lastEpisodes: Episode[] = [];
        let highestSessionNumber = 0;

        episodeGroup.getEpisodes().forEach((episode) => {
            let foundedStringHasSearchParam: string|null = ArrayUtils.searchByWords(episode.getData(), this.searchParams);
            if (foundedStringHasSearchParam === null) return;

            let number: number = StringUtils.extractNumberFromString(foundedStringHasSearchParam);
            if (number > highestSessionNumber) {
                highestSessionNumber = number;
                lastEpisodes = [];
                lastEpisodes.push(episode);
            } else if(number === highestSessionNumber){
                lastEpisodes.push(episode)
            }
        });

        let dateOfLastEpisode: Date = Episode.filterLastDate(lastEpisodes);
        let lastDate: Date = episodeGroup.getLastDate()
        //Check is the Episode with the highest number also the last Episode of the serie
        if(dateOfLastEpisode.getTime() !== lastDate.getTime()) return  null;
        if (highestSessionNumber === 0) return null;
        return highestSessionNumber;
    }

    // Count Sessions by counting same Elements
    private static findHighestSessionByCount = (episodeGroup: EpisodeGroup): number => {
        // console.log("Find Highest Session by Counting");
        let number: number;
        let changedData: unknown[][] | null[][] = ArrayUtils.changeRowWithColum(episodeGroup.getData());
        number = this.countSession(changedData as (string|null)[][]);
        return number;
    }

    private static deepIndex: number = 0;
    private static countSession = (arr2D: (string|null)[][]): number => {
        let arr: (string|null)[] = arr2D[FindHighestSessionUtils.deepIndex];
        for (let i = FindHighestSessionUtils.deepIndex -1 ; i >= 0; i--) {
            for (let j = 0; j < arr.length; j++) {
                if(arr2D[i][j] === null || arr[j] === null) continue;
                arr[j] = <string>arr2D[i][j] + <string>arr[j];
            }
        }
        let counts: any = ArrayUtils.countDuplicate(arr);
        let n: number = 0;

        for (const key in counts) {
            if (counts[key] === 1) { // If there is a single occurrence, the number of seasons is incremented
                n++;
                break;
            }
        }
        for (const obj in counts) {
            if (counts[obj] > 1) { // If there are duplicate entries, they will be reloaded, and you will be asked if there are any single entries.
                FindHighestSessionUtils.deepIndex++;
                n += this.countSession(arr2D);
            }
        }

        FindHighestSessionUtils.deepIndex--;
        return n;
    }
}
