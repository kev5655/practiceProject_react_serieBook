import {seriesAction} from './series-slice'
import {api} from "../utils/api";
import {authActions} from "./authenticate-slice";
import {TokenError} from "../utils/Error";
import {SORT_PARAMS} from "../components/app/seriePanel/FilterAndSort";



export const fetchSeries = (access_token) => {
    return async (dispatch) => {

        const {sendRequestFN: sendSeriesRequest} = api();

        const requestConfig = {
            url: 'http://localhost:8081/api/series',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + access_token
            }
        }

        const extractor = (series) => {
            series.forEach((serie) => {
                if (serie.startDate) {
                    serie.startDate = parseInt(serie.startDate) + 3600000;
                }

                if (serie.endDate) {
                    serie.endDate = parseInt(serie.endDate) + 3600000;
                }

                serie.createdDate = parseInt(serie.createdDate) + 3600000;
                serie.lastModifiedDate = parseInt(serie.lastModifiedDate) + 3600000;

            })
            dispatch(
                seriesAction.loadSerie({
                    items: series || []
                })
            );
            dispatch(sortSeries());

        }

        const catchError = (err) => {
            if (err instanceof TokenError) {
                dispatch(authActions.logout())
            }
            alert(err.message)
            console.error(err)
        }

        await sendSeriesRequest(requestConfig, extractor, catchError)

    }
}

export const sortSeries = (sortParams = SORT_PARAMS.BY_LAST_MODIFIED) => {
    return (dispatch, getState) => {
        const series = [...getState().series.items];
        let sortedSeries = series;
        switch (sortParams.id) {
            case SORT_PARAMS.BY_ABC.id:
                sortedSeries = sortString(series, SORT_PARAMS.BY_ABC.valueName); break;
            case SORT_PARAMS.BY_STARS.id:
                sortedSeries = sortInteger(series, SORT_PARAMS.BY_STARS.valueName); break;
            case SORT_PARAMS.BY_SESSION.id:
                sortedSeries = sortInteger(series, SORT_PARAMS.BY_SESSION.valueName); break;
            case SORT_PARAMS.BY_EPISODE.id:
                sortedSeries = sortInteger(series, SORT_PARAMS.BY_EPISODE.valueName); break;
            case SORT_PARAMS.BY_LAST_MODIFIED.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_LAST_MODIFIED.valueName); break;
            case SORT_PARAMS.BY_CREATED_DATE.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_CREATED_DATE.valueName); break;
            case SORT_PARAMS.BY_START_DATE.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_START_DATE.valueName); break;
            case SORT_PARAMS.BY_END_DATE.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_END_DATE.valueName); break;
            default:
                console.error("Sort Param not found: ")
                console.table(sortParams)
                break

        }
        dispatch(seriesAction.updateSerie({series: sortedSeries}))

    }
}

function sortString(serieList, valueName) {
    serieList.sort((first, second) => {
        first = first[valueName].toLowerCase();
        second = second[valueName].toLowerCase();
        return first < second ? -1 : first > second ? 1 : 0;
    })
    return serieList;
}
function sortInteger(serieList, valueName) {
    serieList.sort((first, second) => {
        return second[valueName] - first[valueName];
    })
    return serieList;
}
function sortDate(serieList, valueName) {
    serieList.sort((first, second) => {
        return new Date(second[valueName]) - new Date(first[valueName]);
    })
    return serieList;
}

export function searchSerie(searchInput) {
    return (dispatch, getState) => {
        if (searchInput !== "") {
            const series = [...getState().series.items];
            let filteredSeries = series.filter((serie) => {
                let index = serie.title.toLowerCase().search(searchInput.toLowerCase());
                return -1 !== index;
            })
            dispatch(seriesAction.updateSerie({series: filteredSeries}));
        }
    }
}

