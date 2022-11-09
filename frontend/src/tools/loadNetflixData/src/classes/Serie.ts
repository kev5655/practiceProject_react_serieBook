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

}