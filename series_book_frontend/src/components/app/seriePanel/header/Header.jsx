import React from "react";

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import classes from './Header.module.css'

const Header = (props) => {

    const switchToAddFromHandler = () => {
        props.openAddForm();
    }


    return(
        <article className={classes.container}>
            <h1 className={classes.title}>Serie Liste</h1>
            <div className={classes.icon_container}>
                <FilterListIcon className={classes.icon}/>
                <AddIcon onClick={switchToAddFromHandler} className={classes.icon}/>
            </div>
        </article>
    )
}

export default Header;