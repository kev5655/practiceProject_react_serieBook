import React, {useContext, useEffect, useState} from "react";

import {v4 as uuidv4} from "uuid";

import SeriePanel from "./seriePanel/SeriePanel";
import ManageSeriePanel from "./manageSerie/ManageSeriePanel";
import LoggingPanel from "./loggin/LoggingPanel";

import {getJwtToken, setJwtToken, setRefreshToken} from "../utils/jwt"
import {fetchData} from "../utils/api";

import classes from './Panel.module.css'
import BlurEffect from "../storage/blurEffect";


const ACTIVE_PANEL = {
    SERIE_LIST: 0,
    MANAGE_SERIE: 1
}

export const MANAGE_FORM = {
    ADDING: 0,
    EDIT: 1,
    LOGGING: 2
}

const DUMMY_SERIES = [
    {
        id: uuidv4(),
        title: "Attack On Titan",
        session: 4,
        episode: 12,
        startDate: new Date(2011, 1, 1),
        endDate: new Date(2012, 2, 2),
        stars: [1, 1, 1, 1, 0],
    },
    {
        id: uuidv4(),
        title: "My Hero Academy",
        session: 2,
        episode: 22,
        startDate: new Date(2013, 3, 3),
        endDate: new Date(2013, 3, 3),
        stars: [1, 1, 1, 0, 0],
    }
]

const Panel = () => {

    const [state, setState] = useState(ACTIVE_PANEL.SERIE_LIST);
    const [series, setSeries] = useState([]);
    const [editSerie, setEditSerie] = useState();
    const [loggedIn, setLoggedIn] = useState(false)

    const globalBlur = useContext(BlurEffect)

    const onMainClickHandler = (e) => {
        //if(! document.getElementById("detailSerie").contains(e.target)){
        //    if(globalBlur.isBlur){
        //        //globalBlur.deactivateBlur()
        //    }
        //}
    }

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

    const onCancelAddFormHandler = () => {
        setState(ACTIVE_PANEL.SERIE_LIST)
    }

    const onLoggingHandler = () => {
        setLoggedIn(true)
        setState(ACTIVE_PANEL.SERIE_LIST)
    }

    const onLogoutHandler = () => {
        setLoggedIn(false)
        setJwtToken("")
        setRefreshToken("")
        console.log(getJwtToken())
    }


    useEffect(() => {
        getSeries().then()
    }, [loggedIn])

    let getSeries = async () => {
        try {
            let response = await fetchData('/api/series', 'Post', null, 'application/x-www-form-urlencoded;charset=UTF-8')

            response.map((serie) => {
                let splitUpDate = serie.startDate.split("/")
                serie.startDate = new Date(splitUpDate[2], splitUpDate[1], splitUpDate[0]);

                splitUpDate = serie.endDate.split("/")
                serie.endDate = new Date(splitUpDate[2], splitUpDate[1], splitUpDate[0]);

                splitUpDate = serie.createdDate.replaceAll(" ", "/").replaceAll(":", "/").split("/")
                serie.createdDate = new Date(splitUpDate[0], splitUpDate[1], splitUpDate[2], splitUpDate[3], splitUpDate[4], splitUpDate[5])

                delete serie.username;
            })
            console.log("Fetch Series: ", response)
            setSeries(response)

        } catch (exception) {
            console.error(exception)
            setState(ACTIVE_PANEL.LOGGING);
        }
    }


    return (
        <main className={`${globalBlur.isBlur && classes.blur}`} onClick={onMainClickHandler}>
            <input type='button' value="Logout" onClick={onLogoutHandler}/>
            {state === ACTIVE_PANEL.SERIE_LIST && <SeriePanel serieList={series}
                                                              openAddForm={openAddFromHandler}
                                                              onEditSerie={editSerieHandler}
            />}

            {state === ACTIVE_PANEL.MANAGE_SERIE && <ManageSeriePanel title='Edit Serie'
                                                                      editingSerie={editSerie}
                                                                      onManagedSerie={addSerieHandler}
                                                                      onCancel={onCancelAddFormHandler}
            />}
            {state === ACTIVE_PANEL.LOGGING && <LoggingPanel
                onLogging={onLoggingHandler}/>}
        </main>
    );
}

export default Panel;