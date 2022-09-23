import React, {useContext} from "react";

import classes from './Header.module.css'

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

const Header = (props) => {

    const switchToAddFromHandler = () => {
        props.openAddForm();
    }

    return (
        <article className={classes.container}>
            <h1>Serie Liste</h1> {/* Global Styling in App.css */}
            <div className={classes.icon_container}>
                <FilterListIcon className={classes.icon_hover}/>
                <AddIcon onClick={switchToAddFromHandler}
                         className={classes.icon_hover}
                />
            </div>
        </article>
    )
}

export default Header;