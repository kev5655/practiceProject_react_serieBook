import React from 'react'
import ReactDOM from 'react-dom';
import Card from "../../../ui/Card";

import classes from './DetailSerie.module.css'
import serie from "../serieList/Serie";

const DetailSeriePanle = (props) => {
    console.log(props)
    return (
        <Card className={classes.card}>
            <p>{props.title}</p>
            <p>{props.session} Session</p>
            <p>{props.episode} Episode</p>
            <p>StartDate: {props.startDate.toLocaleString()}</p>
            <p>EndDate: {props.endDate.toLocaleString()}</p>
            <p>CreatedDate: {props.createdDate.toLocaleString()}</p>
            <p>stars: {props.stars}</p>
        </Card>
    )
}


const DetailSerie = (props) => {

    console.log(props.serie)

    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(<DetailSeriePanle
                    title={props.serie.title}
                    session={props.serie.session}
                    episode={props.serie.episode}
                    startDate={props.serie.startDate}
                    endDate={props.serie.endDate}
                    createdDate={props.serie.createdDate}
                    stars={props.serie.stars}
                    />,
                    document.getElementById('detailSerie')
                )
            }
        </React.Fragment>
    )
}

export default DetailSerie;