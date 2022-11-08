
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
    const entity = deleteArrayElement(readCsvFile('./rsc/NetflixViewingHistory_Kevin.csv'), 0);
    let episodeRaw: string[] = filterSeries(entity);
    episodeRaw = removeDuplicate(episodeRaw);


    //episode = new Episode(episodeRaw[0], minLengthOfSerieName);

    for (const episodeElement of episodeRaw) {
        const episode: Episode = new Episode(episodeElement, minLengthOfSerieName);
        EpisodeGroup.getInstace(episode);
    }
    // @ts-ignore
    // let episodeGroups: EpisodeGroup[] = episode.getEpisodeGroups()
    // episodeGroups.forEach(group => new Serie(group))

    //let foundedGroup: EpisodeGroup = episode.getEpisodeGroupByName("Black Lagoon")
    const foundedGroup: EpisodeGroup = EpisodeGroup.getEpisodeByName("Shaman King");

    new Serie(foundedGroup)


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
    return listOfEntity.sort().filter(function (item, index, ary) {
        return !index || item.split(",")[0] !== ary[index - 1].split(",")[0]
    });
}

main();