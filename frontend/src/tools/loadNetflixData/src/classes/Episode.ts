export class Episode {
    private allDataArray: string[];
    private name: string;
    private data: string[];
    private date: Date = new Date();
    private static episodes: Episode[] = [];

    constructor(private allData: string, private minLengthOfName: number) {
        this.allDataArray = this.generateArray(allData);
        this.name = this.generateName();
        this.data = this.generateData();
        this.date = this.generateDate(this.allDataArray[this.allDataArray.length - 1]);
        //console.log(this.date.toLocaleDateString())
        Episode.episodes.push(this);
    }

    private generateArray = (allData: string): string[] => {
        let dataArray: string[] = allData.split(","); // Split by ,
        dataArray = dataArray.map((data) => {
            let temp = data.slice(0, -1);
            return temp.slice(1);
        })
        let data = dataArray.join(":");
        dataArray = data.split(":");
        return dataArray;
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

    getEpisodes = (): Episode[] => {
        return Episode.episodes;
    }


}