import React, {useContext} from "react";

import classes from './Serie.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import BlurEffect from "../../../storage/blurEffect";


const Serie = (props) => {

    const globalBlur = useContext(BlurEffect)

    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

    const onClickHandler = () => {
        props.onClick({
            id: props.id,
            title: props.title,
            session: props.session,
            episode: props.episode,
            startDate: props.startDate,
            endDate: props.endDate,
            createdDate: props.createdDate,
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
            stars: props.stars,
        })
    }

    return (
        <article className={`${classes.serie} ${!globalBlur.isBlur && classes.serie_hover}`} onClick={onClickHandler}>
            <div>
                <div className={classes.serie_firstRow}>
                    <p className={classes.serie_firstRow_title}>{props.title}</p>
                    <p className={classes.serie_firstRow_text}>{props.session}S</p>
                    <p className={classes.serie_firstRow_text}>{props.episode}E</p>
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
            <MoreHorizIcon
                onClick={editSerieHandler}
                className={`${!globalBlur.isBlur && classes.serie_editIcon_hover}`}/>
        </article>
    );
}

export default Serie;