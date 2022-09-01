import React from "react";

import classes from './Serie.module.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';


const Serie = (props) => {

    const editSerieHandler = () => {
        props.editSerie(this.props)
    }

    console.log(props)

    return (
        <article className={classes.serie_context}>
            <div className={classes.serie}>
                <div>
                    <div className={classes.serie_leftContent}>
                        <title>{props.title}</title>
                        <p>{props.season}S</p>
                        <p>{props.episode}E</p>
                    </div>

                    <div>
                        <StarRoundedIcon className={classes.star}/>
                        <StarHalfRoundedIcon className={classes.star}/>
                        <StarOutlineRoundedIcon className={classes.star}/>
                        <StarOutlineRoundedIcon className={classes.star}/>
                        <StarOutlineRoundedIcon className={classes.star}/>
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