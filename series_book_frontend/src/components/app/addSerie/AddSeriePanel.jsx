import React from 'react'

import classes from './AddSeriePanel.module.css'
import SerieForm from "./SerieForm";


const AddSeriePanel = (props) => {

    return (
        <div className={classes.card}>
            <header className={classes.card_header}>
                <h1 className={classes.card_header_title}>Add new Serie</h1>
            </header>

            <SerieForm onAddSerie={props.onAddSerie} onCancel={props.onCancel}/>

        </div>
    )
}

export default AddSeriePanel;