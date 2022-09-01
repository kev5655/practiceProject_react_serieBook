import React, {useState} from 'react'

import classes from './AddSeriePanel.module.css'
import SerieForm from "./SerieForm";

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

const AddSeriePanel = (props) => {

    return (
        <div className={classes.card}>
            <header className={classes.card_header}>
                <h1 className={classes.card_header_title}>Add new Serie</h1>
            </header>

            <SerieForm onAddSerie={props.onAddSerie}/>

        </div>
    )
}

export default AddSeriePanel;