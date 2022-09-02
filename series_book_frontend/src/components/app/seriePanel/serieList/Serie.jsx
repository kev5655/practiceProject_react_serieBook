import React from "react";

import classes from './Serie.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


const Serie = (props) => {

    const editSerieHandler = () => {
        props.editSerie(props)
    }

    return (
        <article className={classes.serie}>
            <div>
                <div className={classes.serie_firstRow}>
                    <title className={classes.serie_firstRow_title}>{props.title}</title>
                    <p className={classes.serie_firstRow_text}>{props.session}S</p>
                    <p className={classes.serie_firstRow_text}>{props.episode}E</p>
                </div>

                <div>
                    {props.stars.map((value, i) => {
                        if (value === 1) {
                            return (<StarRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                        } else {
                            return (<StarOutlineRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                        }
                    })}
                </div>
            </div>
            <MoreHorizIcon
                onClick={editSerieHandler}
                className={classes.serie_editIcon}/>
        </article>
    );
}

export default Serie;