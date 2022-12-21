import React, {useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

import IconBtn from "../../ui/form/IconBtn";

import classes from './Header.module.css'
import FilterAndSort from "./FilterAndSort";


const Header = (props) => {

    const [isFilterActive, setFilterActive] = useState(false);

    const onFilterClickHandler = () => {
        setFilterActive(!isFilterActive);
    }

    const switchToAddFromHandler = () => {
        props.openAddForm();
    }

    return (
        <>
            <article className={classes.container}>
                <h1>Serie Liste</h1> {/* Global Styling in App.css */}
                <div className={classes.icon_container}>
                    <IconBtn icon={FilterListIcon}
                             onClick={onFilterClickHandler}/>
                    <IconBtn icon={AddIcon}
                             onClick={switchToAddFromHandler}/>
                </div>
            </article>
            {isFilterActive && <FilterAndSort/>}
        </>
    )
}

export default Header;