import React, {useState} from "react";

import classes from './Serie.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import {fireChangeForInputTimeIfValid} from "@testing-library/user-event/dist/keyboard/shared";


const Serie = (props) => {

    //const [starsElements, setStarsElement] = useState(createStars());

    //const createStars = () => {
    //    let elements = []
    //    for (let i = 0; i < 5; i++) {
    //        if (props.stars > i) {
    //            elements.push(<StarRoundedIcon className={classes.star} key={i}/>)
    //        } else {
    //            elements.push(<StarOutlineRoundedIcon className={classes.star} key={i}/>)
    //        }
    //    }
    //    return elements
    //}
    //const addSerieHandler = (newSerie) => {
//
    //    setSeries((prevSerie) => {
    //        console.log(newSerie)
    //        console.log(prevSerie);
    //        return [newSerie, ...prevSerie];
    //    });
    //    setState(ActivePanel.SerieList);
    //}


    return (
        <article className={classes.serie_context}>
            <div className={classes.serie}>
                <div>
                    <div className={classes.serie_leftContent}>
                        <title>{props.title}</title>
                        <p>{props.session}S</p>
                        <p>{props.episode}E</p>
                    </div>

                    <div>
                        {props.stars.map((value, i) => {
                            if (value === 1) {
                                return (<StarRoundedIcon className={classes.star} key={i}/>)
                            } else {
                                return (<StarOutlineRoundedIcon className={classes.star} key={i}/>)
                            }
                        })}
                    </div>
                </div>

                <MoreHorizIcon
                    onClick={props.editSerie}
                    sx={{
                        "&:hover": {
                            color: '#868686',
                        },
                    }}/>
            </div>
        </article>
    );
}

export default Serie;