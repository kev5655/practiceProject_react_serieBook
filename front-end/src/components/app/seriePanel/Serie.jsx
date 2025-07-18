import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import {useDispatch, useSelector} from "react-redux";
import {seriesAction} from "../../../store/series-slice";
import IconBtn from "../../ui/form/IconBtn";

import classes from './Serie.module.css';
import {useNavigate} from "react-router-dom";


const Serie = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isBlurred = useSelector(state => {
        console.log('SERIE: Reading Redux state:', state);
        return state.ui?.isSerieListBlur || false;
    });

    const {title, episode, session, stars} = props.serie

    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

    const validEpisode = () => {
        const isNull = episode === null;
        const isIntNull = episode === 0;
        const isUndefined = episode === undefined;
        const isStringNull = episode === "";
        return !isNull && !isIntNull && !isUndefined && !isStringNull;
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        props.onClick(props.serie)
    }

    const editSerieHandler = (e) => {
        e.stopPropagation();
        dispatch(seriesAction.selectSerie({serie: props.serie}))
        navigate('edit')
        //props.editSerie(props.serie);
    }

    return (
        <section className={`${classes.serie} ${classes.serie_hover}`} onClick={onClickHandler}>
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
        </section>
    );
}

export default Serie;