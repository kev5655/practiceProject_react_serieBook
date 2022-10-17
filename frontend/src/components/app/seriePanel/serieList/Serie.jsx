import React from "react";

import classes from './Serie.module.css'
import iconStyles from '../../../styles/Icon.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


const Serie = (props) => {

    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

    const validEpisode = () => {
        let isNull = props.episode === null;
        let isIntNull = props.episode === 0;
        let isUndefined = props.episode === undefined;
        let isStringNull = props.episode === "";
        return !isNull && !isIntNull && !isUndefined && !isStringNull;
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        props.onClick({
            id: props.id,
            title: props.title,
            session: props.session,
            episode: props.episode,
            startDate: props.startDate,
            endDate: props.endDate,
            createdDate: props.createdDate,
            lastModifiedDate: props.lastModifiedDate,
            stars: props.stars,
        })
    }

    const editSerieHandler = (e) => {
        e.stopPropagation();
        props.editSerie({
            id: props.id,
            title: props.title,
            session: props.session,
            episode: props.episode,
            startDate: props.startDate,
            endDate: props.endDate,
            createdDate: props.createdDate,
            lastModifiedDate: props.lastModifiedDate,
            stars: props.stars,
        })
    }

    return (
        <article className={`${classes.serie} ${classes.serie_hover}`} onClick={onClickHandler}>
            <div>
                <div className={classes.serie_firstRow}>
                    <p className={classes.serie_firstRow_title}>{props.title}</p>
                    <p className={classes.serie_firstRow_text}>{props.session}S</p>
                    {validEpisode() && <p className={classes.serie_firstRow_text}>{props.episode}E</p> }
                </div>

                <div>
                    {createArray(props.stars, 5).map((value, i) => {
                        if (value === 1) {
                            return (<StarRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                        } else {
                            return (<StarOutlineRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                        }
                    })}
                </div>
            </div>

            <EditIcon
                fontSize="small"
                onClick={editSerieHandler}
                className={iconStyles.icon_hover}/>
        </article>
    );
}

export default Serie;