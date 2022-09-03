import React from 'react'

import classes from './ManageSeriePanel.module.css'
import ManageSerieForm from "./ManageSerieForm";
import Card from './../../ui/Card'


const ManageSeriePanel = (props) => {

    console.log(props)

    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>{props.title}</h1> {/* Global Styling in App.css */}
            </header>

            {
                props.editingSerie !== undefined && <ManageSerieForm
                    id={props.editingSerie.id}
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
            }
            {
                props.editingSerie === undefined && <ManageSerieForm
                cancelBtnLabel='Cancel'
                submitBtnLabel='Add'
                onManagedSerie={props.onManagedSerie}
                isEdit='false'
                onCancel={props.onCancel}
                />
            }
        </Card>
    )
}

export default ManageSeriePanel;