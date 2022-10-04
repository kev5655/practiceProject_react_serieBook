import React, {useContext, useEffect, useState} from "react";

import SeriePanel from "./seriePanel/SeriePanel";
import ManageSeriePanel from "./manageSerie/ManageSeriePanel";
import LoggingPanel from "./loggin/LoggingPanel";

import {getJwtToken, setJwtToken, setRefreshToken} from "../utils/jwt"
import {fetchData} from "../utils/api";

import classes from './Panel.module.css'
import BlurEffect from "../storage/blurEffect";


const ACTIVE_PANEL = {
    SERIE_LIST: 0, MANAGE_SERIE: 1
}

export const MANAGE_FORM = {
    ADDING: 0, EDIT: 1, LOGGING: 2
}

const Panel = () => {

    const [state, setState] = useState(ACTIVE_PANEL.SERIE_LIST);
    const [series, setSeries] = useState([]);
    const [editSerie, setEditSerie] = useState();
    const [loggedIn, setLoggedIn] = useState(getJwtToken() !== null);
    const [isLoaded, setIsLoaded] = useState(false)

    const globalBlur = useContext(BlurEffect)

    const addSerieHandler = (newSerie) => {
        if (newSerie.isEdit.toString() === "true") {
            const editedSeries = series.map((serie) => {
                if (serie.id === newSerie.id) {
                    return newSerie;
                }
                return serie;
            })
            setSeries(editedSeries)
        } else {
            setSeries((prevSerie) => {
                console.log(newSerie)
                console.log(prevSerie);
                return [newSerie, ...prevSerie];
            });
        }
        setState(ACTIVE_PANEL.SERIE_LIST);
    }

    const openAddFromHandler = () => {
        setEditSerie(undefined)
        setState(ACTIVE_PANEL.MANAGE_SERIE)
    }

    const editSerieHandler = (editSerie) => {
        console.log(series)
        editSerie = Object.assign(editSerie, {isEdit: true})
        setEditSerie(editSerie);
        setState(ACTIVE_PANEL.MANAGE_SERIE)
    }

    const onCancelHandler = () => {
        setState(ACTIVE_PANEL.SERIE_LIST)
    }

    const onDeletionHandler = (serieToBeDeleted) => {
        setState(ACTIVE_PANEL.SERIE_LIST)
        let newSerieList = series.filter((serie) => {
            return serieToBeDeleted.id !== serie.id;
        })
        setSeries(newSerieList)
    }

    const onLoggingHandler = () => {
        setLoggedIn(true)
        setState(ACTIVE_PANEL.SERIE_LIST)
    }

    const onLogoutHandler = () => {
        setLoggedIn(false);
        setJwtToken("");
        setRefreshToken("");
        console.log(getJwtToken());
    }


    useEffect(() => {
        if(loggedIn){
            getSeries().then(() => setIsLoaded(true))
        } else {
            setState(ACTIVE_PANEL.LOGGING);
        }
    }, [loggedIn]);

    let getSeries = async () => {
        let response;
        try {
            response = await fetchData('/api/series', 'Post', null, 'application/x-www-form-urlencoded;charset=UTF-8')

            response.forEach((serie) => {
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
            console.log("Fetch Series: ", response)
            setSeries(response)

        } catch (exception) {
            console.error(exception, response)
            setState(ACTIVE_PANEL.LOGGING);
        }
    }


    return (
         <main className={`${globalBlur.isBlur && classes.blur}`}>
            <input type='button' value="Logout" onClick={onLogoutHandler}/>
            {state === ACTIVE_PANEL.SERIE_LIST && isLoaded && <SeriePanel serieList={series}
                                                              openAddForm={openAddFromHandler}
                                                              onEditSerie={editSerieHandler}
            />}

            {state === ACTIVE_PANEL.MANAGE_SERIE && isLoaded &&
                <ManageSeriePanel title={editSerie !== undefined ? 'Edit Serie' : "Add Serie"}
                                  editingSerie={editSerie}
                                  onManagedSerie={addSerieHandler}
                                  onCancel={onCancelHandler}
                                  onDeletion={onDeletionHandler}
                />}
            {state === ACTIVE_PANEL.LOGGING && <LoggingPanel
                onLogging={onLoggingHandler}/>}
        </main>
    )
}

export default Panel;
