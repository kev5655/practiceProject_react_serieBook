import React from "react"

import classes from './Card.module.css'

const Card = React.forwardRef((props,ref) => {

    const styles = classes.card + ' ' + props.className

    return(
        <section className={styles}
                 id={props.id}
                 ref={ref}>
            {props.children}
        </section>
    );
});

export default Card;