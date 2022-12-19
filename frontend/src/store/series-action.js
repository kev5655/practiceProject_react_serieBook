
import { seriesAction } from './series-slice'
import {api} from "../utils/api";
import {authActions} from "./authenticate-slice";
import {TokenError} from "../utils/Error";


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
                    serie.startDate = new Date(parseInt(serie.startDate) + 3600000);
                }

                if (serie.endDate) {
                    serie.endDate = new Date(parseInt(serie.endDate) + 3600000);
                }

                serie.createdDate = new Date(parseInt(serie.createdDate) + 3600000);
                serie.lastModifiedDate = new Date(parseInt(serie.lastModifiedDate) + 3600000);

            })
            dispatch(
                seriesAction.loadSerie({
                    items: series || []
                })
            );
        }

        const catchError = (err) => {
            if(err instanceof TokenError){
                dispatch(authActions.logout())
            }
            alert(err.message)
            console.error(err)
        }

        await sendSeriesRequest(requestConfig, extractor, catchError)

    }
}

