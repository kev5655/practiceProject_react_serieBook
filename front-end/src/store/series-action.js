import {seriesAction} from './series-slice'
import {api} from "../utils/api";
import {TokenError} from "../utils/Error";
import {SORT_PARAMS} from "../components/app/seriePanel/FilterAndSort";
import {logout} from "./authenticate-action";


export const fetchSeries = () => {
    return async (dispatch, getState) => {

        const {sendRequestFN: sendSeriesRequest} = api();
        const access_token = getState().auth.access_token;

        const requestConfig = {
            url: '/api/series',
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
                seriesAction.loadSeries({
                    series: series || []
                })
            );
            dispatch(sortSeries());

        }

        const catchError = (err) => {
            if (err instanceof TokenError) {
                dispatch(logout())
            }
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
                sortedSeries = sortString(series, SORT_PARAMS.BY_ABC.valueName);
                break;
            case SORT_PARAMS.BY_STARS.id:
                sortedSeries = sortInteger(series, SORT_PARAMS.BY_STARS.valueName);
                break;
            case SORT_PARAMS.BY_SESSION.id:
                sortedSeries = sortInteger(series, SORT_PARAMS.BY_SESSION.valueName);
                break;
            case SORT_PARAMS.BY_EPISODE.id:
                sortedSeries = sortInteger(series, SORT_PARAMS.BY_EPISODE.valueName);
                break;
            case SORT_PARAMS.BY_LAST_MODIFIED.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_LAST_MODIFIED.valueName);
                break;
            case SORT_PARAMS.BY_CREATED_DATE.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_CREATED_DATE.valueName);
                break;
            case SORT_PARAMS.BY_START_DATE.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_START_DATE.valueName);
                break;
            case SORT_PARAMS.BY_END_DATE.id:
                sortedSeries = sortDate(series, SORT_PARAMS.BY_END_DATE.valueName);
                break;
            default:
                console.error("Sort Param not found: ")
                console.table(sortParams)
                break

        }
        dispatch(seriesAction.updateFilteredSerie({series: sortedSeries}))

    }
}

const sortString = (serieList, valueName) => {
    serieList.sort((first, second) => {
        first = first[valueName].toLowerCase();
        second = second[valueName].toLowerCase();
        return first < second ? -1 : first > second ? 1 : 0;
    })
    return serieList;
}
const sortInteger = (serieList, valueName) => {
    serieList.sort((first, second) => {
        return second[valueName] - first[valueName];
    })
    return serieList;
}
const sortDate = (serieList, valueName) => {
    serieList.sort((first, second) => {
        return new Date(second[valueName]) - new Date(first[valueName]);
    })
    return serieList;
}

export const searchSerie = (searchInput) => {
    return (dispatch, getState) => {
        if (searchInput !== "") {
            const series = [...getState().series.items];
            let filteredSeries = series.filter((serie) => {
                let index = serie.title.toLowerCase().search(searchInput.toLowerCase());
                return -1 !== index;
            })
            dispatch(seriesAction.updateFilteredSerie({series: filteredSeries}));
        }
    }
}

export const addSerie = (newSerie) => {
    return async (dispatch, getState) => {
        const {sendRequestFN: sendAddSerieRequest} = api();
        const access_token = getState().auth.access_token;

        const requestConfig = {
            url: '/api/serie/add',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: newSerie
        }

        const extractor = (serie) => {
            const series = [...getState().series.items];
            newSerie.id = serie.id;
            series.push(newSerie)
            dispatch(seriesAction.loadSeries({series: series}));
            dispatch(sortSeries());
        }

        const catchError = (err) => {
            if (err instanceof TokenError) {
                dispatch(logout())
            }
        }

        await sendAddSerieRequest(requestConfig, extractor, catchError)
    }
}

export const editSerie = (editedSerie) => {
    return async (dispatch, getState) => {
        const {sendRequestFN: sendAddSerieRequest} = api();
        const access_token = getState().auth.access_token;

        const requestConfig = {
            url: '/api/serie/update',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: editedSerie
        }

        const extractor = () => {
            const series = [...getState().series.items];
            let updatesSeries = series.map((serie) => {
                if (serie.id === editedSerie.id) {
                    return editedSerie
                }
                return serie;
            })
            dispatch(seriesAction.loadSeries({series: updatesSeries}));
            dispatch(sortSeries())
        }

        const catchError = (err) => {
            if (err instanceof TokenError) {
                dispatch(logout())
            }
        }

        await sendAddSerieRequest(requestConfig, extractor, catchError);
    }
}

export const erasing = (extinguishingSeries) => {
    return async (dispatch, getState) => {
        const {sendRequestFN: sendDeleteSerieRequest} = api();
        const access_token = getState().auth.access_token;

        const requestConfig = {
            url: '/api/serie/delete',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: extinguishingSeries
        }

        const extractor = () => {
            const series = [...getState().series.items];
            const filteredSeries = [...getState().series.filteredItems];

            const newSeries = series.filter(serie => extinguishingSeries.id !== serie.id);
            const newFilteredSeries = filteredSeries.filter(serie => extinguishingSeries.id !== serie.id)


            dispatch(seriesAction.loadSeries({series: newSeries}));
            dispatch(seriesAction.updateFilteredSerie({series: newFilteredSeries}));
        }

        const catchError = (err) => {
            if (err instanceof TokenError) {
                dispatch(logout())
            }
        }

        await sendDeleteSerieRequest(requestConfig, extractor, catchError);
    }
}



