import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import {useDispatch} from "react-redux";
import {seriesAction} from "../../../../store/series-slice";
import IconBtn from "../../../ui/form/IconBtn";

import classes from './Serie.module.css'


const Serie = (props) => {
    const dispatch = useDispatch();

    const {id : serieId, title, episode, session, stars} = props.serie

    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

    const validEpisode = () => {
        let isNull = episode === null;
        let isIntNull = episode === 0;
        let isUndefined = episode === undefined;
        let isStringNull = episode === "";
        return !isNull && !isIntNull && !isUndefined && !isStringNull;
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        props.onClick(props.serie)
    }

    const editSerieHandler = (e) => {
        e.stopPropagation();
        dispatch(seriesAction.selectSerie(serieId))
        //props.editSerie(props.serie);
    }

    return (
        <article className={`${classes.serie} ${classes.serie_hover}`} onClick={onClickHandler}>
            <div>
                <div className={classes.serie_firstRow}>
                    <p className={classes.serie_firstRow_title}>{title}</p>
                    <p className={classes.serie_firstRow_text}>{session}S</p>
                    {validEpisode() && <p className={classes.serie_firstRow_text}>{episode}E</p> }
                </div>

                <div>
                    {createArray(stars, 5).map((value, i) => {
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