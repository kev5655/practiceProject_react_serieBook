import React from "react"

import classes from './Card.module.css'

const Card = (props) => {

    const styles = classes.card + ' ' + props.className

    return(
        <article className={styles}
                 id={props.id}>
            {props.children}
        </article>
    );
};

export default Card;