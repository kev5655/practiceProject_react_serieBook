import React from "react";

import SerieList from "./serieList/SerieList";

import './SeriePanel.module.css'
import Card from "../../ui/Card";
import Header from "./header/Header";

const SeriePanel = (props) => {

    return (
        <>

            <Card>
                <Header openAddForm={props.openAddForm}/>
            </Card>

            <Card>
                <SerieList editSerie={props.editSerie} serieList={props.serieList}/>
            </Card>

            <footer>

            </footer>
        </>
    );
}

export default SeriePanel;