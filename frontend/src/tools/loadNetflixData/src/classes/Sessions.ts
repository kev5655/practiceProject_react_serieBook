import {ArrayUtils} from "./utlis/ArrayUtils.js";
import {type} from "os";


export class Sessions {

    searchParams: string[] = ["Staffel", "Teil", "Season"];

    n: number = 0;
    deepIndex: number = 0;

    constructor() {
    }


    public findHighestSession = (serieData: string[][]): number => {
        //return this.findHighestSessionByNumber(serieData) ??
        return this.findHighestSessionByCount(serieData);
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
        //let foundedStrings: string[] = [];
        let foundedStrings: string | null = null;
        data.forEach((element) => {
            for (const param of searchParams) {
                if (element.includes(param)) {
                    foundedStrings = element;
                    //foundedStrings.push(element);
                    return;
                }
            }
        })
        return foundedStrings;
    }

    private extractNumberFromArray = (data: string) => {
        let strNumber: string = data.replace(/\D/gm, '');
        if (strNumber === '') {
            return 0;
        }
        return parseInt(strNumber);
    }

    private findHighestSessionByCount = (data: string[][]): number => {
        console.log("Find Highest Session by Counting");
        let number: number = 0;
        let changedData: string[][] | null[][] = ArrayUtils.changeRowWithColum(data);
        number = this.countSession(changedData); //changedData.values()


        return number;
    }

    private countSession(arr2D: string[][] | null[][]): number { //itr: IterableIterator<string[]> | IterableIterator<null[]>
        let counts: any = {};
        let arr: string[] | null[] = arr2D[this.deepIndex];

        console.log(arr);
        if(arr === undefined) arr = [];
        for (const key of arr) {
            if(key === null){
                console.log("Arr has null values: ", arr);
                continue;
            }
            counts[key] = (counts[key] || 0) + 1;
        }

        for (const key in counts) {
            if (counts[key] === 1) {
                this.n++;
                break;
            }
        }
        for (const obj in counts) {
            if (counts[obj] > 1) {
                //this.countSession(itr);
                this.deepIndex++;
                this.countSession(arr2D);
            }
        }

        console.log(counts);
        this.deepIndex--;
        return this.n;
    }

    private countDublicate = (arr: string[]): Map<string, number> => {
        let counterMap = new Map<string, number>();
        return counterMap;
    }



}




















