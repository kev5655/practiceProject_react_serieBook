import React, {useRef, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

import Card from "../../../ui/Card";

import classes from './DetailSerie.module.css'
import Popup from "reactjs-popup";

const DetailSerie = (props) => {
    const [openPopUp, setOpenPopUp] = useState(true);

    const onClose = () => {
        setOpenPopUp(false);
        props.onClickOutside();
    }

    const isUnknown = (value) => {
        return value !== null && value !== 0 && value !== undefined && value !== '';
    }

    return (
        <Popup open={openPopUp} closeOnDocumentClick onClose={onClose}>
            <Card className={classes.card}
                  id='detailSerie'
            >
                <p className={classes.gird_title}>{props.serie.title}</p>

                <p className={classes.grid_desc_session}>Session</p>
                <p className={classes.grid_value_session}> {props.serie.session} </p>

                <p className={classes.gird_desc_episode}>Episode</p>
                {isUnknown(props.serie.episode) ?
                    <p className={classes.gird_value_episode}>{props.serie.episode}</p> :
                    <p className={classes.gird_value_episode}>unknown</p>}

                <p className={classes.gird_desc_startDate}>StartDate</p>
                {isUnknown(props.serie.startDate) ?
                    <p className={classes.grid_value_startDate}>{props.serie.startDate.toLocaleString()}</p> :
                    <p className={classes.grid_value_startDate}>unknown</p>}

                <p className={classes.gird_desc_endDate}>EndDate:</p>
                {isUnknown(props.serie.endDate) ?
                    <p className={classes.grid_value_endDate}>{props.serie.endDate.toLocaleString()}</p> :
                    <p className={classes.grid_value_endDate}>unknown</p>}

                <p className={classes.grid_desc_createdDate}>CreatedDate:</p>
                <p className={classes.grid_value_createdDate}>{props.serie.createdDate.toLocaleString()}</p>
                <p className={classes.grid_stars}>stars: {props.serie.stars}</p>
            </Card>
        </Popup>
    )
}

export default DetailSerie;

// <p>Id: {props.serie.id}</p>