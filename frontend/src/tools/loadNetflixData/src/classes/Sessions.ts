import {ArrayUtils} from "./utlis/ArrayUtils.js";


export class Sessions {

    private searchParams: string[] = ["Staffel", "Teil", "Season"];

    constructor() {}

    public findHighest = (serieData: string[][]): number => {
        //return this.findHighestSessionByNumber(serieData) ??
        return this.findHighestSessionByCount(serieData);
    }


    // Count Episode
    public countEpisodeOfLastSession(data: string[][], serieDates: Date[]): number {
        const serieData: Array<Array<string|Date>> = [];
        data.forEach((value) => {
            serieData.push(value);
        })

        serieData.forEach((value, index) => {
            value.push(serieDates[index]);
        })

        return this.countLastEpisode(serieData);
    }

    private countLastEpisode = (arr2D: (string | Date)[][]): any => {
        let arr: (unknown)[][] = ArrayUtils.changeRowWithColum(arr2D);
        let lastEpisode: string[] = this.findLastEpisode(arr);
        console.log("Serie Data");
        console.table(ArrayUtils.changeRowWithColum(arr));
        console.log("Last Episode");
        console.table(lastEpisode);

        this.deleteEverythingExceptLastSession(lastEpisode, arr);
        console.log("Last Session Data");
        console.table(ArrayUtils.changeRowWithColum(arr));

        for (let i = 0; i < arr.length - 1; i++) {
            if(arr[i].length !== arr[i + 1].length) throw new Error("Array's are have not the same length");
        }
        return arr[0].length;
    }

    private findLastEpisode = (arr: (unknown)[][]): string[] => {
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

    private deleteEverythingExceptLastSession = (lastEpisode: string[], arr: (unknown)[][]) => {
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
                let number: number = counts[element]
                if(number > 1 && element !== lastEpisode[i]){
                    for (let k = 0; k < arr.length; k++) {
                        arr[k].splice(j, 1);
                    }
                    j--;
                }
            }
        }
    }

    // Count Sessions by search Params
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

    // Count Sessions by counting same Elements
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
        for (let i = this.deepIndexSession -1 ; i >= 0; i--) {
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
                this.deepIndexSession++;
                n += this.countSession(arr2D);
            }
        }

        this.deepIndexSession--;
        return n;
    }


}




















