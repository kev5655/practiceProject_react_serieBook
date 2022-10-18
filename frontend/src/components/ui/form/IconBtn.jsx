import React from "react";

import classes from './IconBtn.module.css'

const IconBtn = (props) => {

    const iconStyle = props.className

    const isUnknown = (value) => {
        return value !== null && value !== 0 && value !== undefined && value !== '';
    }

    const onClickHandler = (event) => {
        props.onClick(event);
    }

    return(
        <>
        {<props.icon fontSize="small"
                        className={`${isUnknown(iconStyle) ? iconStyle : classes.icon_hover}`}
                        onClick={onClickHandler}
            />}
        </>
    )
}

export default IconBtn;