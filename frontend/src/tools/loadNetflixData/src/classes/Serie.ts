import {EpisodeGroup} from "./EpisodeGroup.js";
import {FindHighestSessionUtils} from "./utlis/FindHighestSessionUtils.js";
import {FindHighestEpisodeUtils} from "./utlis/FindHighestEpisodeUtils.js";


export class Serie {

    private readonly name: string;
    private readonly session: number;
    private readonly episode: number;
    private stars: number = 0;
    private readonly startDate: Date;
    private readonly endDate: Date;
    private createdDate: Date;
    private lastModifiedDate: Date;

    private readonly rawData: string[][] = [];

    private static index: number = 0;
    private static series: Serie[] = [];

    searchParams: string[] = ["Staffel", "Teil", "Season"];

    constructor(episodeGroup: EpisodeGroup) {
        Serie.index++;
        this.name = episodeGroup.getName();
        this.startDate = episodeGroup.getFirstDate();
        this.endDate = episodeGroup.getLastDate();
        this.createdDate = new Date(Date.now());
        this.lastModifiedDate = new Date(Date.now());
        this.rawData = episodeGroup.getRawData();

        //this.session = this.generateSession(episodeGroup.getData())
        // console.log("\n\n" + Serie.index + " Data of: " + this.name + " data: ");
        this.session = FindHighestSessionUtils.findHighestSession(episodeGroup);
        // console.log("Session Number: " + this.session)
        this.episode = FindHighestEpisodeUtils.countEpisodeOfLastSession(episodeGroup);
        // console.log("Session Number: " + this.session + " Episode Number: " + this.episode);

        Serie.series.push(this);
    }

    print = () => {
        console.log(`\n\n\n
            Name: ${this.name} Session: ${this.session} Episode ${this.episode} \n
            StartDate: ${this.startDate.toDateString()} -> EndDate: ${this.endDate.toDateString()} \n
            RawData: \n
        `)
        console.table(this.rawData)

    }

}