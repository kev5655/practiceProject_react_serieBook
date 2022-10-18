import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import IconBtn from "../../../ui/form/IconBtn";

import classes from './Serie.module.css'


const Serie = (props) => {

    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

    const validEpisode = () => {
        let isNull = props.serie.episode === null;
        let isIntNull = props.serie.episode === 0;
        let isUndefined = props.serie.episode === undefined;
        let isStringNull = props.serie.episode === "";
        return !isNull && !isIntNull && !isUndefined && !isStringNull;
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        props.onClick(props.serie)
    }

    const editSerieHandler = (e) => {
        e.stopPropagation();
        props.editSerie(props.serie);
    }

    return (
        <article className={`${classes.serie} ${classes.serie_hover}`} onClick={onClickHandler}>
            <div>
                <div className={classes.serie_firstRow}>
                    <p className={classes.serie_firstRow_title}>{props.serie.title}</p>
                    <p className={classes.serie_firstRow_text}>{props.serie.session}S</p>
                    {validEpisode() && <p className={classes.serie_firstRow_text}>{props.serie.episode}E</p> }
                </div>

                <div>
                    {createArray(props.serie.stars, 5).map((value, i) => {
                        if (value === 1) {
                            return (<StarRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                        } else {
                            return (<StarOutlineRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                        }
                    })}
                </div>
            </div>
            <IconBtn icon={EditIcon}
                     onClick={editSerieHandler}/>
        </article>
    );
}

export default Serie;