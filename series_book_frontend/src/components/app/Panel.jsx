import React, {useEffect, useState} from "react";

import {v4 as uuidv4} from "uuid";

import SeriePanel from "./seriePanel/SeriePanel";

import './Panel.module.css'
import ManageSeriePanel from "./manageSerie/ManageSeriePanel";

const ACTIVE_PANEL = {
    SERIE_LIST: 0,
    MANAGE_SERIE: 1
}

export const MANAGE_FORM = {
    ADDING: 0,
    EDIT: 1
}

const DUMMY_SERIES = [
    {
        id: uuidv4(),
        title: "Attack On Titan",
        session: 4,
        episode: 12,
        startDate: new Date(2011,1,1),
        endDate: new Date(2012,2,2),
        stars: [1, 1, 1, 1, 0],
    },
    {
        id: uuidv4(),
        title: "My Hero Academy",
        session: 2,
        episode: 22,
        startDate: new Date(2013,3,3),
        endDate: new Date(2013,3,3),
        stars: [1, 1, 1, 0, 0],
    }
]


const Panel = () => {

    const [state, setState] = useState(ACTIVE_PANEL.SERIE_LIST);
    const [series, setSeries] = useState([]);
    const [editSerie, setEditSerie] = useState();

    const addSerieHandler = (newSerie) => {
        if(newSerie.isEdit.toString() === "true"){
            const editedSeries = series.map((serie) => {
                if(serie.id === newSerie.id){
                    return newSerie;
                }
                return serie;
            })
            setSeries(editedSeries)
        }else{
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
        editSerie = Object.assign(editSerie, {isEdit: true})
        setEditSerie(editSerie);
        setState(ACTIVE_PANEL.MANAGE_SERIE)
    }


    const onCancelAddFormHandler = () => {
        setState(ACTIVE_PANEL.SERIE_LIST)
    }


    useEffect(() => {
        getSeries()
    }, [])

    let getSeries = async () => {
        let response = await fetch('/api/series/');
        let data = await response.json()

        data.map((serie) => {
            serie.endDate = new Date(parseInt(serie.endDate.split('/')[2]), parseInt(serie.endDate.split('/')[1]), parseInt(serie.endDate.split('/')[0]))
            serie.startDate = new Date(parseInt(serie.startDate.split('/')[2]), parseInt(serie.startDate.split('/')[1]), parseInt(serie.startDate.split('/')[0]))
            serie.created = new Date(serie.created)
            serie.update = new Date(serie.update)

            setSeries(data)
        })


    }


    return (
        <main>
            {state === ACTIVE_PANEL.SERIE_LIST && <SeriePanel serieList={series}
                                                            openAddForm={openAddFromHandler}
                                                            onEditSerie={editSerieHandler}/>}

            {state === ACTIVE_PANEL.MANAGE_SERIE && <ManageSeriePanel title='Edit Serie'
                                                                  editingSerie={editSerie}
                                                                  onManagedSerie={addSerieHandler}
                                                                  onCancel={onCancelAddFormHandler}/>}
        </main>
    );
}

export default Panel;