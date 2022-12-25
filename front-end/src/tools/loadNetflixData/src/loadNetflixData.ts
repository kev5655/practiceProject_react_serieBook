
// const dataStructur = {
//     films: [String...],
//     series: [{
//         episodes: [{
//             data: String,
//             dataArray: [String...], //Splitting by ":" or ","
//             name: String,
//             session: int = null,
//             episode: int = null
//             date: new Date,
//
//         }],
//         serie: {
//             name: String,
//             session: int,
//             episode: int,
//             stars: 0,
//             startDate: new Date,
//             endDate: new Date,
//             createdDate: new Date(Date.now()),
//             lastModifiedDate: new Date(Date.now()),
//         }
//     }]
// }


import * as path from "path";
import * as fs from "fs";
import {Episode} from "./classes/Episode.js";
import {EpisodeGroup} from "./classes/EpisodeGroup.js";
import {Serie} from "./classes/Serie.js";

let minLengthOfSerieName: number = 3;

const main = () => {
    console.log("Start Prog");
    const entity = deleteArrayElement(readCsvFile('./rsc/NetflixViewingHistory_Fabienne.csv'), 0); //./rsc/NetflixViewingHistory_Kevin.csv
    let episodeRaw: string[] = filterSeries(entity);
    episodeRaw = removeDuplicate(episodeRaw);


    //episode = new Episode(episodeRaw[0], minLengthOfSerieName);

    for (const episodeElement of episodeRaw) {
        const episode: Episode = new Episode(episodeElement, minLengthOfSerieName);
        EpisodeGroup.getInstance(episode);
    }

    let episodeGroups: EpisodeGroup[] = EpisodeGroup.getEpisodeGroups()

    episodeGroups.forEach(group =>{
        // group.shrinkData()
        new Serie(group).print()
    })

    // const foundedGroup: EpisodeGroup = EpisodeGroup.getEpisodeByName("Blue Period");
    // foundedGroup.shrinkData()
    // new Serie(foundedGroup).print();



    let arr: Array<Array<string|Date>> = [
        ["A","B","C","D", new Date(2005,0,1)],
        ["A","B","C","F", new Date(2004,0,1)],
        ["A","B","G", new Date(2003,0,1)],
        ["A","H","I" , new Date(2002,0,1)],
        ["B","J", new Date(2001,0,1)]
    ];
    //ArrayUtils.countLastEpisode(arr);


    //let jsons: string[] = episodeGroups.map(group => JSON.stringify(group))
    //let names: string[] = episodeGroups.map(group => group.getName());
    //writeJsonFile(jsons, names, "./rsc/out_episodeGroup.json");

}

const readCsvFile = (csvPath: string): string[] => {
    try {
        const fileContents = fs.readFileSync(
            path.join(path.resolve(), csvPath),
            {
                encoding: 'utf8',
            },
        );
        return fileContents.split("\n");

    } catch (err) {
        throw new Error("File wurde nicht gefunden: " + err);
    }
}

const writeJsonFile = (jsons: string[], names: string[], filePath: string) => {
    let data: string = "{";
    jsons.forEach((json, index) => data += '"' + names[index] + '":[' + json + "],");
    data += "}"
    fs.writeFile(filePath, data, "utf8", (error) => {
        if(error){
            throw new Error("File written failed");
        } else {
            console.log("File written successfully")
        }
    })
}

const deleteArrayElement = (arr:string[], index:number) => {
    arr.splice(index, 1);
    return arr;
}

const filterSeries = (listOfEntity: string[]):string[] => {
    let saves = [];
    let episode: string[] = [];
    let films: string[] = [];

    for (const element of listOfEntity) {
        const name = element.split(":")[0];
        const foundSave = saves.find(save => save.name === name)
        if(foundSave === undefined) {
            saves.push({name:name, elements: [element], n: 1});
        }else {
            foundSave.n++;
            foundSave.elements.push(element)
        }
    }
    
    for(const save of saves){
        if(save.n > 1){
            for(const element of save.elements){
                episode.push(element);
            }
        }else {
            for(const element of save.elements){
                films.push(element);
            }
        }
    }

    return episode;
}

const removeDuplicate = (listOfEntity: string []): string[] => {
    let seen = new Set();
    let list = listOfEntity.reverse()
    return list.filter(item => {
        let withOutDate = item.slice(0, -11)
        return seen.has(withOutDate) ? false : seen.add(withOutDate);
    }).reverse()
}

main();