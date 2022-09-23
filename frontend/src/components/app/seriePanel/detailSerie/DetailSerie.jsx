import React, {useRef, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

import Card from "../../../ui/Card";

import classes from './DetailSerie.module.css'
import Popup from "reactjs-popup";

const DetailSeriePanle = (props) => {
    const [openPopUp, setOpenPopUp] = useState(true);

    const onClose = () => {
        setOpenPopUp(false)
        props.onClickOutside()
    }

    return (
        <Popup open={openPopUp} closeOnDocumentClick onClose={onClose}>
            <Card className={classes.card}
                  id='detailSerie'
            >
                <p>Id: {props.id}</p>
                <p>{props.title}</p>
                <p>{props.session} Session</p>
                <p>{props.episode} Episode</p>
                <p>StartDate: {props.startDate.toLocaleString()}</p>
                <p>EndDate: {props.endDate.toLocaleString()}</p>
                <p>CreatedDate: {props.createdDate.toLocaleString()}</p>
                <p>stars: {props.stars}</p>
            </Card>
        </Popup>
    )
}


const DetailSerie = (props) => {

    return (
        <DetailSeriePanle
            id={props.serie.id}
            title={props.serie.title}
            session={props.serie.session}
            episode={props.serie.episode}
            startDate={props.serie.startDate}
            endDate={props.serie.endDate}
            createdDate={props.serie.createdDate}
            stars={props.serie.stars}
            onClickOutside={props.onClickOutside}
        />
    )
}

export default DetailSerie;