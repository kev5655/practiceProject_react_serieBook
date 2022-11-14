import {ArrayUtils} from "./utlis/ArrayUtils.js";
import {EpisodeGroup} from "./EpisodeGroup";


export class Sessions {

    private searchParams: string[] = ["Staffel", "Teil", "Season"];

    constructor() {}

    public findHighest = (serieData: string[][]): number => {
        //return this.findHighestSessionByNumber(serieData) ??
        return this.findHighestSessionByCount(serieData);
    }

    deepIndexEpisode: number = 0;

    public countEpisodeOfLastSession(data: string[][], serieDates: Date[]): number {
        const serieData: Array<Array<string|Date>> = new Array();
        data.forEach((value, index1) => {
            serieData.push(value);
        })

        serieData.forEach((value, index) => {
            value.push(serieDates[index]);
        })

        let number: number = ArrayUtils.countLastEpisode(serieData);

        return number;

    }

    private extractLastestEpisode = (serieData: string[][], serieDates: Date[], lastDate: Date): string[][] => {
        let lastEpisodes: string[][] = [];
        serieData.forEach((data, index) => {
            if (serieDates[index].toLocaleString() === lastDate.toLocaleString()) {
                console.log("Data: ", serieDates[index].toLocaleString(), data.toString());
                lastEpisodes.push(data);
            }
        });
        return lastEpisodes;
    }

    private iterateToUnique = (arr2D: string[][] | null[][]): string[] | null[] => {
        let counter: any = ArrayUtils.countDuplicate(arr2D[this.deepIndexEpisode]);

        for (const key in counter) {
            if (counter[key] > 1) {
                this.deepIndexEpisode++;
                this.iterateToUnique(arr2D)
            }
        }
        console.log(counter);
        return arr2D[this.deepIndexEpisode];

    }

    private countEpisode = (arr: string[] | null[]): number => {
        let n: number = 0;
        arr.forEach((value) => {
            if(value !== null){
                n++;
            }
        });
        return n;
    }

    private findHighestSessionByNumber = (serieData: string[][]): number | null => {
        console.log("Find Highest Session by Number");
        let numbers: number[] = [];
        serieData.forEach((episodeData) => {
            let foundedStringsHasWord = this.searchByWords(episodeData, this.searchParams);
            if (foundedStringsHasWord === null) return;
            numbers.push(this.extractNumberFromArray(foundedStringsHasWord));
        });
        if (numbers.length === 0) return null;
        return Math.max(...numbers);
    }

    private searchByWords = (data: string[], searchParams: string[]): string | null => {
        let foundedStrings: string | null = null;
        data.forEach((element) => {
            for (const param of searchParams) {
                if (element.includes(param)) {
                    foundedStrings = element;
                    return;
                }
            }
        })
        return foundedStrings;
    }

    private extractNumberFromArray = (data: string) => {
        let strNumber: string = data.replace(/\D/gm, '');
        if (strNumber === '') return 0;
        return parseInt(strNumber);
    }

    private findHighestSessionByCount = (data: string[][]): number => {
        console.log("Find Highest Session by Counting");
        let number: number = 0;
        let changedData: unknown[][] | null[][] = ArrayUtils.changeRowWithColum(data);
        number = this.countSession(changedData as (string|null)[][]); //as Array<Array<string|null>>
        return number;
    }

    deepIndexSession: number = 0;
    private countSession = (arr2D: (string|null)[][]): number => {
        let arr: (string|null)[] = arr2D[this.deepIndexSession];
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
                this.deepIndexSession++;
                n += this.countSession(arr2D);
            }
        }

        this.deepIndexSession--;
        return n;
    }


}




















