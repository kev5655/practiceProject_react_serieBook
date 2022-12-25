import React from "react"

import classes from './Card.module.css'

const Card = (props) => {

    const styles = classes.card + ' ' + props.className

    return(
        <section className={styles}
                 id={props.id}>
            {props.children}
        </section>
    );
};

export default Card;