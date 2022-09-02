import React from "react";

import SerieList from "./serieList/SerieList";

import './SeriePanel.module.css'
import Card from "../../ui/Card";
import Header from "./header/Header";

import classes from './SeriePanel.module.css'

const SeriePanel = (props) => {

    return (
        <>

            <Card className={classes.header_card}>
                <Header openAddForm={props.openAddForm}/>
            </Card>

            <Card className={classes.serieList_card}>
                <SerieList editSerie={props.editSerie} serieList={props.serieList}/>
            </Card>

            <footer>

            </footer>
        </>
    );
}

export default SeriePanel;