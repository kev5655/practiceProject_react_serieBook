import React, {useContext} from "react";

import classes from './Header.module.css'
import iconStyles from '../../../styles/Icon.module.css'

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

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
                <FilterListIcon fontSize="small"
                                className={iconStyles.icon_hover}
                                onClick={onFilterClickHandler}/>
                <AddIcon fontSize="small"
                         className={iconStyles.icon_hover}
                         onClick={switchToAddFromHandler}/>
            </div>
        </article>
    )
}

export default Header;