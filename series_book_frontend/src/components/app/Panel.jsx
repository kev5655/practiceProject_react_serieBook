import React, {useState} from "react";

import SeriePanel from "./seriePanel/SeriePanel";
import AddSeriePanel from "./addSerie/AddSeriePanel";
import EditSeriePanel from "./editSerie/EditSeriePanel"

import './Panel.module.css'


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
        stars: 4,
    },
    {
        title: "My Hero Academy",
        session: 2,
        episode: 22,
        startDate: new Date(2022, 2, 13),
        endDate: new Date(2022, 6, 18),
        stars: 3,
    }
]


const Panel = () => {

    const [state, setState] = useState(ActivePanel.SerieList);
    const [series, setSeries] = useState(DUMMY_SERIES);

    const addSerieHandler = (newSerie) => {
        setSeries((prevSerie) => {
            return [newSerie, ...prevSerie];
        });
        console.log(series);
    }

    const openAddFromHandler = () => {
        setState(ActivePanel.AddSerie)
    }

    const editSerieHandler = () => {
        setState(ActivePanel.EditSerie)
    }

    return (
        <main>
            {state === ActivePanel.SerieList && <SeriePanel serieList={series}
                                                            openAddForm={openAddFromHandler}
                                                            editSerie={editSerieHandler}/>}
            {state === ActivePanel.AddSerie && <AddSeriePanel onAddSerie={addSerieHandler}/>}
            {state === ActivePanel.EditSerie && <EditSeriePanel/>}
        </main>
    );
}

export default Panel;