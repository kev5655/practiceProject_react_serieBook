import React, {useState} from "react";

import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";

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
        startDate: dayjs('2011-01-01') ,
        endDate: dayjs('2022-02-02') ,
        stars: [1, 1, 1, 1, 0],
    },
    {
        id: uuidv4(),
        title: "My Hero Academy",
        session: 2,
        episode: 22,
        startDate: dayjs('2033-03-03'),
        endDate: dayjs('2044-04-04'),
        stars: [1, 1, 1, 0, 0],
    }
]


const Panel = () => {

    const [state, setState] = useState(ACTIVE_PANEL.SERIE_LIST);
    const [series, setSeries] = useState(DUMMY_SERIES);
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