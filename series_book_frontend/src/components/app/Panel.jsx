import React, {useState} from "react";

import SeriePanel from "./seriePanel/SeriePanel";
import AddSeriePanel from "./addSerie/AddSeriePanel";
import EditSeriePanel from "./editSerie/EditSeriePanel"

import './Panel.module.css'
import ManageSeriePanel from "./editSerie/ManageSeriePanel";


const ActivePanel = {
    SerieList: 0,
    AddSerie: 1,
    EditSerie: 2,
}

const DUMMY_SERIES = [
    {
        title: "Attack On Titan",
        session: 4,
        episode: 12,
        startDate: new Date(2021, 5, 2),
        endDate: new Date(2022, 1, 20),
        stars: [1, 1, 1, 1, 0],
    },
    {
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

        setSeries((prevSerie) => {
            console.log(newSerie)
            console.log(prevSerie);
            return [newSerie, ...prevSerie];
        });
        setState(ActivePanel.SerieList);
    }

    const openAddFromHandler = () => {
        setState(ActivePanel.AddSerie)
    }

    const editSerieHandler = (editSerie) => {
        console.log(editSerie)
        editSerie = [...editSerie, {isEdit: true}]
        setEditSerie(editSerie)
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
            {state === ActivePanel.AddSerie && <AddSeriePanel onAddSerie={addSerieHandler}
                                                              onCancel={onCancelAddFormHandler}/>}
            {state === ActivePanel.EditSerie && <ManageSeriePanel title='Edit Serie'
                                                                  editingSerie={editSerie}
                                                                  onManagedSerie={addSerieHandler}
                                                                  onCancel={onCancelAddFormHandler}/>}
        </main>
    );
}

export default Panel;