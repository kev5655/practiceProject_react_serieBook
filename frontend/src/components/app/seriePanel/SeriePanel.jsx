import React, {useState} from "react";

import SerieList from "./serieList/SerieList";

import './SeriePanel.module.css'
import Card from "../../ui/Card";
import Header from "./header/Header";

import classes from './SeriePanel.module.css'
import FilterAndSort from "./header/FilterAndSort";

const SeriePanel = (props) => {
    const [serieList, setSerieList] = useState(props.serieList);
    const [isFilterActive, setFilterActive] = useState(false);

    const onCompileHandler = (compiledSerie) => {
        setSerieList(compiledSerie);
    }

    const onFilterClickHandler = () => {
        setFilterActive(true)
    }

    return (<>

        <Card className={classes.header_card}>
            <Header onFilter={onFilterClickHandler}
                    openAddForm={props.openAddForm}/>
            <FilterAndSort
                isFilterActive={isFilterActive}
                serieList={props.serieList}
                onCompileSeire={onCompileHandler}/>
        </Card>

        <Card className={classes.serieList_card}>
            <SerieList editSerie={props.onEditSerie} serieList={serieList}/>
        </Card>

        <footer>

        </footer>
    </>);
}

export default SeriePanel;