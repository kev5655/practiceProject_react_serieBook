import React, {useState} from "react";

import SeriePanel from "./seriePanel/SeriePanel";

import './Panel.module.css'
import ManageSeriePanel from "./manageSerie/ManageSeriePanel";
import {v4 as uuidv4} from "uuid";


const ActivePanel = {
    SerieList: 0,
    AddSerie: 1,
    EditSerie: 2,
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
        startDate: new Date(2021, 5, 2),
        endDate: new Date(2022, 1, 20),
        stars: [1, 1, 1, 1, 0],
    },
    {
        id: uuidv4(),
        title: "My Hero Academy",
        session: 2,
        episode: 22,
        startDate: new Date(2022, 2, 13),
        endDate: new Date(2022, 6, 18),
        stars: [1, 1, 1, 0, 0],
    }
]


const Panel = () => {

    const [state, setState] = useState(ActivePanel.SerieList);
    const [series, setSeries] = useState(DUMMY_SERIES);
    const [editSerie, setEditSerie] = useState();

    const addSerieHandler = (newSerie) => {

        if(newSerie.isEdit === "true"){
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


        setState(ActivePanel.SerieList);
    }

    const openAddFromHandler = () => {
        setEditSerie(undefined)
        setState(ActivePanel.EditSerie)
    }

    const editSerieHandler = (editSerie) => {
        editSerie = Object.assign(editSerie, {isEdit: true})
        setEditSerie(editSerie);
        setState(ActivePanel.EditSerie)
    }


    const onCancelAddFormHandler = () => {
        setState(ActivePanel.SerieList)
    }

    return (
        <main>
            {state === ActivePanel.SerieList && <SeriePanel serieList={series}
                                                            openAddForm={openAddFromHandler}
                                                            onEditSerie={editSerieHandler}/>}

            {state === ActivePanel.EditSerie && <ManageSeriePanel title='Edit Serie'
                                                                  editingSerie={editSerie}
                                                                  onManagedSerie={addSerieHandler}
                                                                  onCancel={onCancelAddFormHandler}/>}
        </main>
    );
}

export default Panel;