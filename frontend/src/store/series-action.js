import { useSelector } from 'react-redux'
import { seriesAction } from './series-slice'
import {api, TokenError} from "../utils/api";
import {authActions} from "./authenticate-slice";


const backendURL = "http://localhost:8081"
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
                let splitUpDate;
                if (serie.startDate !== '') {
                    splitUpDate = serie.startDate.split("/")
                    serie.startDate = new Date(splitUpDate[2], splitUpDate[1] - 1, splitUpDate[0]);
                }

                if (serie.endDate) {
                    splitUpDate = serie.endDate.split("/")
                    serie.endDate = new Date(splitUpDate[2], splitUpDate[1] - 1, splitUpDate[0]);
                }

                splitUpDate = serie.createdDate.replaceAll(" ", "/").replaceAll(":", "/").split("/")
                serie.createdDate = new Date(splitUpDate[0], splitUpDate[1] - 1, splitUpDate[2], splitUpDate[3], splitUpDate[4], splitUpDate[5])

                splitUpDate = serie.lastModifiedDate.replaceAll(" ", "/").replaceAll(":", "/").split("/")
                serie.lastModifiedDate = new Date(splitUpDate[0], splitUpDate[1] - 1, splitUpDate[2], splitUpDate[3], splitUpDate[4], splitUpDate[5])

                delete serie.username;
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
            console.error(err)
        }

        await sendSeriesRequest(requestConfig, extractor, catchError)

    }
}

