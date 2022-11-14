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
        const serieData: Array<Array<string|Date>> = [];
        data.forEach((value, index1) => {
            serieData.push(value);
        })

        serieData.forEach((value, index) => {
            value.push(serieDates[index]);
        })

        let number: number = this.countLastEpisode(serieData);

        return number;

    }

    private countLastEpisode = (arr2D: (string | Date)[][]): any => {
        let arr: (unknown)[][] = ArrayUtils.changeRowWithColum(arr2D);
        let lastEpisode: string[] = this.findFistDateIndex(arr);
        let haveDuplicated: boolean = false;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if(arr[i][j] instanceof Date) continue;
                if(arr[i][j] === null) continue
                if (lastEpisode[i] === arr[i][j]) {
                    haveDuplicated = true;
                }

            }
            if(! haveDuplicated){
                console.log(arr, arr[i].length  + 1)
                return arr[i].length  + 1;
            }
            haveDuplicated = false;
            for (let j = 0; j < arr[i].length; j++) { // Remove Element
                if (lastEpisode[i] !== arr[i][j]) {
                    for (let k = 0; k < arr.length; k++) {
                        arr[k].splice(j, 1);
                    }
                    j--;
                }
            }
        }
        console.log(arr)

    }

    private findFistDateIndex = (arr: (unknown)[][]): string[] => {

        console.log(arr);
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

        let newestEpisode: string[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][columIndex] === null) continue;
            if (arr[i][columIndex] instanceof Date) continue;
            newestEpisode.push((arr[i][columIndex] as string));
            arr[i].splice(columIndex, 1);
        }
        return newestEpisode;
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




















