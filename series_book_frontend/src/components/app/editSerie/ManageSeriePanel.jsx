import React from 'react'

import classes from './ManageSeriePanel.module.css'
import ManageSerieForm from "./ManageSerieForm";


const ManageSeriePanel = (props) => {

    console.log(props)

    return (
        <div className={classes.card}>
            <header className={classes.card_header}>
                <h1 className={classes.card_header_title}>{props.title}</h1>
            </header>

            <ManageSerieForm
                titleValue={props.editingSerie.title}
                sessionValue={props.editingSerie.session}
                episodeValue={props.editingSerie.episode}
                starsValue={props.editingSerie.stars}
                startDateValue={props.editingSerie.startDate}
                endDateValue={props.editingSerie.endDate}
                cancelBtnLabel='Cancel'
                submitBtnLabel='Editieren'
                isEdit={props.editingSerie.isEdit}
                onManagedSerie={props.onManagedSerie}
                onCancel={props.onCancel}/>
        </div>
    )
}

export default ManageSeriePanel;