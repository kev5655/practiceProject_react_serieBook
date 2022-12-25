

export class Episode {
    private readonly allDataArray: string[];
    private readonly name: string;
    private readonly data: string[];
    private readonly date: Date = new Date();

    constructor(private allData: string, private minLengthOfName: number) {
        this.allDataArray = this.generateArray(allData);
        this.name = this.generateName();
        this.data = this.generateData();
        this.date = this.generateDate(this.allDataArray[this.allDataArray.length - 1]);
    }

    static filterLastDate = (episodes: Episode[]): Date => {
        let dates: Date[] = []
        episodes.forEach(episode => dates.push(episode.getDate()))
        return new Date(Math.max.apply(null, dates));
    }

    private generateArray = (allData: string): string[] => {
        allData = this.replaceAll(allData, '"', "");
        const lastCommaIndex = allData.lastIndexOf(",");
        const fistStr = allData.slice(0, lastCommaIndex);
        const lastStr = allData.slice(lastCommaIndex + 1)
        const arr = [...fistStr.split(":"), lastStr]
        return arr;
        //return allData.split(/[:,]/); // Split by " and ,
    }

    private replaceAll = (str : string, match: string, replacement: string) => {
        return str.replace(new RegExp(this.escapeRegExp(match), 'g'), ()=>replacement);
    }

    private escapeRegExp = (data: string) => {
        return data.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    generateName = (): string => {
        let name: string = this.allDataArray[0];
        if (name.length < this.minLengthOfName) {
            console.error("WARN Name is to short: " + name + " adding: " + this.allDataArray[1])
            return name + this.allDataArray[1];
        }
        return name;
    }

    generateData = (): string[] => {
        const data: string[] = [...this.allDataArray];
        data.shift();
        data.pop();
        return data;
    }

    private generateDate = (dateString: string): Date => {
        let timeArray = dateString.split(".");
        let year: number = parseInt("20" + timeArray[2]);
        let month: number = parseInt(timeArray[1]) - 1;
        let day: number = parseInt(timeArray[0]);
        let date = new Date(year, month, day);
        if (date.toString() !== "Invalid Date") {
            return date;
        }
        let errorStr = "Invalid Date " + date + " Raw: d:" + day + " m: " + month + " y: " + year;
        throw new Error(errorStr);
    }

    getName = (): string => {
        return this.name;
    }

    getData = (): string[] => {
        return this.data;
    }

    getDate = (): Date => {
        return this.date;
    }

    getAllData = () => {
        return this.allDataArray;
    }

}