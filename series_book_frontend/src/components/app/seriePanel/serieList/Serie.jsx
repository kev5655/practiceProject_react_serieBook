import React from "react";

import classes from './Serie.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


const Serie = (props) => {

    return (
        <article className={classes.serie}>
            <div>
                <div className={classes.serie_firstRow}>
                    <title>{props.title}</title>
                    <p>{props.session}S</p>
                    <p>{props.episode}E</p>
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
                onClick={props.editSerie}
                sx={{
                    "&:hover": {
                        color: '#868686',
                    },
                }}/>
        </article>
    );
}

export default Serie;