import {ArrayUtils} from "./ArrayUtils.js";
import {EpisodeGroup} from "../EpisodeGroup.js";

export class FindHighestEpisodeUtils {

    // Count Episode
    public static countEpisodeOfLastSession = (episodeGroup: EpisodeGroup): number => {
        const serieData: Array<Array<string|Date>> = episodeGroup.getDataAndDates();
        return this.countLastEpisode(serieData);
    }

    private static countLastEpisode = (arr2D: (string | Date)[][]): any => {
        let arr: (unknown)[][] = ArrayUtils.changeRowWithColum(arr2D);
        let lastEpisode: string[] = this.findLastEpisode(arr);
        // console.log("Serie Data");
        // console.table(ArrayUtils.changeRowWithColum(arr));
        // console.log("Last Episode");
        // console.table(lastEpisode);

        this.deleteEverythingExceptLastSession(lastEpisode, arr);
        // console.log("Last Session Data");
        // console.table(ArrayUtils.changeRowWithColum(arr));

        for (let i = 0; i < arr.length - 1; i++) {
            if(arr[i].length !== arr[i + 1].length) throw new Error("Array's are have not the same length");
        }
        return arr[0].length;
    }

    private static findLastEpisode = (arr: (unknown)[][]): string[] => {
        let lastIndex: number = arr.length - 1;
        let columIndex: number = Infinity;
        let minDate: Date = new Date(0);

        for (let i = 0; i < arr[lastIndex].length; i++) {
            let date: unknown = arr[lastIndex][i];
            if (date instanceof Date) {
                if (minDate.getTime() < date.getTime()) {
                    minDate = date;
                    columIndex = i;
                }
            } else if (date === null) {
                i--;
                lastIndex--;
            } else { // date ist type of string
                i--;
                lastIndex++;
            }
        }
        if(columIndex === Infinity) throw new Error("columIndex is Infinity")

        let newestEpisode: string[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][columIndex] === null) continue;
            if (arr[i][columIndex] instanceof Date) continue;
            newestEpisode.push((arr[i][columIndex] as string));
        }
        return newestEpisode;
    }

    private static deleteEverythingExceptLastSession = (lastEpisode: string[], arr: (unknown)[][]) => {
        for (let i = 0; i < arr.length; i++) {
            let isAllCountsSingle = true;
            const counts = ArrayUtils.countDuplicate(<(string|null)[]>arr[i]);
            for (const key in counts) {
                if (counts[key] > 1) { // If there is a single occurrence, the number of seasons is incremented
                    isAllCountsSingle = false
                }
            }
            if(isAllCountsSingle) {
                return
            }

            for (let j = 0; j < arr[i].length; j++) {
                if(arr[i][j] instanceof Date) continue;
                if(arr[i][j] === null) continue;
                let element: string = <string>arr[i][j];
                if(element !== lastEpisode[i]){ //number > 1 &&
                    for (let k = 0; k < arr.length; k++) {
                        arr[k].splice(j, 1);
                    }
                    j--;
                }
            }
            // if(i > 0){
            //     console.table(arr)
            // }
        }
    }
}