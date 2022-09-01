import React from "react";

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import classes from './Header.module.css'

const Header = () => {
    return(
        <article className={classes.container}>
            <h1 className={classes.title}>Serie Liste</h1>
            <div className={classes.icon_container}>
                <FilterListIcon className={classes.icon}/>
                <AddIcon className={classes.icon}/>
            </div>
        </article>
    )
}

export default Header;