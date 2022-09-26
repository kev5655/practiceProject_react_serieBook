import React, {useState} from 'react'

import Popup from "reactjs-popup";

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import Card from "../../../ui/Card";

import classes from './DetailSerie.module.css'
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const DetailSerie = (props) => {
    const [openPopUp, setOpenPopUp] = useState(true);


    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

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
                <header className={classes.header}>
                    <p className={classes.header_title}>{props.serie.title}</p>
                </header>
                <section className={classes.gird}>
                    <div className={classes.grid_container_session}>
                        <p>Session</p>
                        <p>{props.serie.session} </p>
                    </div>
                    <div className={classes.gird_container_episode}>
                        <p>Episode</p>
                        {isUnknown(props.serie.episode) ?
                            <p>{props.serie.episode}</p> :
                            <p>unknown</p>}
                    </div>

                    <div className={classes.grid_stars}>
                        {createArray(props.serie.stars, 5).map((value, i) => {
                            if (value === 1) {
                                return (<StarRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                            } else {
                                return (<StarOutlineRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                            }
                        })}
                    </div>

                    <div className={classes.dateGrid}>
                        <p className={`${classes.dateGrid_item_desc_startDate} ${classes.dateGrid_desc_date}`}>Start
                            Date</p>
                        <p className={` ${classes.dateGrid_item_desc_endDate} ${classes.dateGrid_desc_date} `}>End
                            Date</p>

                        <div className={` ${classes.dateGrid_item_value_startDate} ${classes.skewCard}`}>
                            <div className={classes.skewToZero}>
                                {isUnknown(props.serie.startDate) ?
                                    <p>{props.serie.startDate.toLocaleDateString()}</p> :
                                    <p>unknown</p>}
                            </div>
                        </div>
                        <div className={` ${classes.dateGrid_item_value_endDate} ${classes.skewCard}`}>
                            <div className={classes.skewToZero}>
                                {isUnknown(props.serie.endDate) ?
                                    <p>{props.serie.endDate.toLocaleDateString()}</p> :
                                    <p>unknown</p>}
                            </div>
                        </div>
                    </div>
                    <div className={classes.grid_container_createdDate}>
                        <div>
                            <p>Created Date: </p>
                            <p>{props.serie.createdDate.toLocaleString()}</p>
                        </div>
                        <div>
                            <p>Last Modification: </p>
                            <p>{props.serie.lastModifiedDate.toLocaleString()}</p>
                        </div>
                    </div>
                </section>
            </Card>
        </Popup>
    )
}

export default DetailSerie;


//<p>Id: {props.serie.id}</p>

// <ArrowRightAltIcon/>