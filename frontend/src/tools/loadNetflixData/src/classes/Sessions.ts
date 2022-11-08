import {ArrayUtils} from "./utlis/ArrayUtils.js";


export class Sessions {

    searchParams: string[] = ["Staffel", "Teil", "Season"];

    constructor() {}


    public findHighestSession = (serieData: string[][]): number => {
        return this.findHighestSessionByNumber(serieData) ??
            this.findHighestSessionByCount(serieData);
    }

    private findHighestSessionByNumber = (serieData: string[][]): number | null => {
        console.log("Find Highest Session by Number");
        let numbers : number[] = [];
        serieData.forEach((episodeData) => {
            let foundedStringsHasWord = this.searchByWords(episodeData, this.searchParams);
            if(foundedStringsHasWord === null) return;
            numbers.push(this.extractNumberFromArray(foundedStringsHasWord));
        });
        if(numbers.length === 0) return null;
        return Math.max(...numbers);
    }

    private searchByWords = (data: string[], searchParams: string[]): string | null => {
        //let foundedStrings: string[] = [];
        let foundedStrings: string | null = null;
        data.forEach((element) => {
            for(const param of searchParams){
                if(element.includes(param)){
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
        if(strNumber === ''){
            return 0;
        }
        return parseInt(strNumber);
    }

    private findHighestSessionByCount = (data: string[][]): number => {
        console.log("Find Highest Session by Counting");
        data = ArrayUtils.changeRowAndColum(data);

        return 0;
    }








}



















