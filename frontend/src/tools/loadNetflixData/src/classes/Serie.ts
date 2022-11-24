import {EpisodeGroup} from "./EpisodeGroup";
import {Sessions} from "./Sessions.js";
import {Episode} from "./Episode";


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
        this.startDate = episodeGroup.getFirstDate();
        this.endDate = episodeGroup.getLastDate();
        this.createdDate = new Date(Date.now());
        this.lastModifiedDate = new Date(Date.now());

        //this.session = this.generateSession(episodeGroup.getData())
        console.log(Serie.index + " Data of: " + this.name + " data: ");
        console.table(episodeGroup.getData());
        this.session = new Sessions().findHighest(episodeGroup.getData());
        console.log("Session Number: " + this.session)
        this.episode = new Sessions().countEpisodeOfLastSession(episodeGroup.getData(), episodeGroup.getDates());
        console.log("Session Number: " + this.session + " Episode Number: " + this.episode);

        Serie.series.push(this);
    }

}