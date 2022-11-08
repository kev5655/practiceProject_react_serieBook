import {EpisodeGroup} from "./EpisodeGroup";
import {Sessions} from "./Sessions.js";


export class Serie {

    name: string;
    session: number;
    episode: number;
    stars: number = 0;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    lastModifiedDate: Date;
    static index: number = 0;
    static series: Serie[] = [];

    searchParams: string[] = ["Staffel", "Teil", "Season"];

    constructor(episodeGroup: EpisodeGroup) {
        Serie.index++;
        this.name = episodeGroup.getName();
        this.startDate = episodeGroup.getMinDate();
        this.endDate = episodeGroup.getMaxDate();
        this.createdDate = new Date(Date.now());
        this.lastModifiedDate = new Date(Date.now());

        //this.session = this.generateSession(episodeGroup.getData())
        console.log(Serie.index + " Data of: " + this.name + " data: ");
        console.log(episodeGroup.getData());
        this.session = new Sessions().findHighestSession(episodeGroup.getData());
        console.log("Session Number: " + this.session)
        Serie.series.push(this);
    }


    private generateSession = (data: string[][]): number => {
        let session: number = 0;

        let foundedStrings: string[] = this.findStringsInArray(data, this.searchParams);
        console.log(Serie.index + " Data of: " + this.name + " data: ");
        if (foundedStrings.length !== 0) {
            console.log(data)
            session = this.extractHighestNumberBySearchStr(foundedStrings);
            console.log("Session Normal " + session);
            return session;
        }
        console.log(data)
        session = this.getSessionNumberAdvance(data);
        console.log("Session Advance " + session);
        return session;
    }

    private findStringsInArray = (data: string[][], strs: string[]): string[] => {
        let foundedStrings: string[] = [];
        data.forEach((episodeData) => {
            episodeData.forEach((element) => {
                for(const str of strs){
                    if(element.includes(str)){
                        foundedStrings.push(element);
                        return;
                    }
                }
            })
        })
        return foundedStrings;
    }

    private extractHighestNumberBySearchStr = (foundedSessions: string[]): number => {
        let numbers: number[] = [];
        foundedSessions.map(foundedSession => {
            numbers.push(this.extractNumber(foundedSession))
        });
        return Math.max(...numbers);
    }

    private extractNumber = (data: string): number => {
        let strNumber: string = data.replace(/\D/gm, '')
        if(strNumber === ''){
            return 0
        }
        return parseInt(strNumber);
    }

    private getSessionNumberAdvance = (data: string[][]): number => {
        let number: number = 0;
        let firstRow: string[] = []
        data.forEach(element =>
            firstRow.push(element[0])
        )
        number = number + this.countUnique(firstRow);
        firstRow = this.deleteUnique(firstRow)
        number = number + this.countDuplicate(firstRow);
        return number;
    }

    private countUnique = (data: string[]): number => {
        let n: number = 0;
        const counts: any = {};
        data.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        for (const obj in counts) {
            if (counts[obj] === 1) {
                return 1;
            }
        }
        return 0;
    }

    private deleteUnique = (data: string[]): string[] => {
        const counts: any = {};
        data.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        for (const key in counts) {
            if (counts[key] === 1) {
                this.removeElement(data, key);
            }
        }

        return data;
    }

    private countDuplicate = (data: string[]): number => {
        let copyData: string[] = [...data];
        let counter: number = 0;
        let openList: string[];

        for (let i = 0; i < copyData.length; i++) {
            for (let j = i; j < copyData.length; j++) {
                if (i === j) continue;
                let element1: string = copyData[i];
                let element2: string = copyData[j];
                if (element1 === undefined || element2 === undefined) continue

                if (element1 === element2) {
                    i++;
                    counter++;
                    this.deleteElement(copyData, element1);
                }
            }
        }
        return counter;
    }

    private generateEpisode = (data: string[][], session: number): number => {
        let number: number | undefined
        number = this.countElementByFindNumber(data, session);
        if(number !== undefined) return number;

        return 0;
    }

    private countElementByFindNumber = (data: string[][], number: number): number | undefined => {
        let foundedArray: string[] = this.findStringsInArray(data, this.searchParams);
        if(foundedArray.length !== 0){

        }
        return 0;
    }

    private removeElement = (arr: string[], element: string) => {
        const index = arr.indexOf(element);
        if (index > -1) { // only splice array when item is found
            arr.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    private deleteElement = (arr: string[], element: string) => {
        arr.forEach((data, index) => {
            if (data === element) {
                delete arr[index];
            }
        })
    }

    private extractNumberOfString = (data: string): number => {
        return 0;
    }


}