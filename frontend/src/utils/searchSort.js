import {SORT_PARAMS} from "../components/app/seriePanel/FilterAndSort";


// export function searchSerie(serieList, searchInput){
//     if(searchInput === "") return serieList
//     return serieList.filter((serie) => {
//         let index = serie.title.toLowerCase().search(searchInput.toLowerCase())
//         return -1 !== index
//     })
// }

// export function sortSerie(serieList, sortParam){
//     let copySerieList = serieList.slice(0);
//     switch (sortParam.id) {
//         case SORT_PARAMS.BY_ABC.id:
//             return sortString(copySerieList, SORT_PARAMS.BY_ABC.valueName);
//         case SORT_PARAMS.BY_STARS.id:
//             return sortInteger(copySerieList, SORT_PARAMS.BY_STARS.valueName);
//         case SORT_PARAMS.BY_SESSION.id:
//             return sortInteger(copySerieList, SORT_PARAMS.BY_SESSION.valueName);
//         case SORT_PARAMS.BY_EPISODE.id:
//             return sortInteger(copySerieList, SORT_PARAMS.BY_EPISODE.valueName);
//         case SORT_PARAMS.BY_LAST_MODIFIED.id:
//             return sortDate(copySerieList, SORT_PARAMS.BY_LAST_MODIFIED.valueName);
//         case SORT_PARAMS.BY_CREATED_DATE.id:
//             return sortDate(copySerieList, SORT_PARAMS.BY_CREATED_DATE.valueName);
//         case SORT_PARAMS.BY_START_DATE.id:
//             return sortDate(copySerieList, SORT_PARAMS.BY_START_DATE.valueName);
//         case SORT_PARAMS.BY_END_DATE.id:
//             return sortDate(copySerieList, SORT_PARAMS.BY_END_DATE.valueName);
//         default:
//             console.error("Sort Param not found: ")
//             console.table(sortParam)
//             break
//
//     }
//     return null;
// }
//
// function sortString(serieList, valueName) {
//     serieList.sort((first, second) => {
//         first = first[valueName].toLowerCase();
//         second = second[valueName].toLowerCase();
//         return first < second ? -1 : first > second ? 1 : 0;
//     })
//     return serieList;
// }
// function  sortInteger(serieList, valueName) {
//     serieList.sort((first, second) => {
//         return second[valueName] - first[valueName];
//     })
//     return serieList;
// }
//
// function sortDate(serieList, valueName){
//     serieList.sort((first, second) => {
//         return new Date(second[valueName]) - new Date(first[valueName]);
//     })
//     return serieList;
// }























