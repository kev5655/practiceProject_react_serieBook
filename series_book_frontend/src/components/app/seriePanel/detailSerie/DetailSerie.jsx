import React, {useRef, useEffect} from 'react'
import ReactDOM from 'react-dom';

import Card from "../../../ui/Card";

import classes from './DetailSerie.module.css'

const DetailSeriePanle = (props) => {
    const ref = useRef(null);
    const { onClickOutside } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside ]);

    return (
        <Card className={classes.card}
              id='detailSerie'
              ref={ref}
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
    )
}


const DetailSerie = (props) => {

    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(<DetailSeriePanle
                    id={props.serie.id}
                    title={props.serie.title}
                    session={props.serie.session}
                    episode={props.serie.episode}
                    startDate={props.serie.startDate}
                    endDate={props.serie.endDate}
                    createdDate={props.serie.createdDate}
                    stars={props.serie.stars}
                    onClickOutside={props.onClickOutside}
                    />,
                    document.getElementById('detailSerie_root')
                )
            }
        </React.Fragment>
    )
}

export default DetailSerie;