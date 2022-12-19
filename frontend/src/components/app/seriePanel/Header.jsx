import React from "react";

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import IconBtn from "../../ui/form/IconBtn";

import classes from './Header.module.css'


const Header = (props) => {

    const onFilterClickHandler = () => {
        props.onFilter();
    }

    const switchToAddFromHandler = () => {
        props.openAddForm();
    }

    return (
        <article className={classes.container}>
            <h1>Serie Liste</h1> {/* Global Styling in App.css */}
            <div className={classes.icon_container}>
                <IconBtn icon={FilterListIcon}
                         onClick={onFilterClickHandler}/>
                <IconBtn icon={AddIcon}
                         onClick={switchToAddFromHandler}/>
            </div>
        </article>
    )
}

export default Header;