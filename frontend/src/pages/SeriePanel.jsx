import React, {useEffect} from "react";

import SerieList from "../components/app/seriePanel/SerieList";

import './SeriePanel.module.css'
import Card from "../components/ui/Card";
import Header from "../components/app/seriePanel/Header";

import classes from './SeriePanel.module.css'
import {useDispatch} from "react-redux";
import {fetchSeries} from "../store/series-action";

const SeriePanel = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSeries())
    }, [dispatch])


    return (<>
        <Card className={classes.header_card}>
            <Header openAddForm={props.openAddForm}/>
        </Card>

        <Card className={classes.serieList_card}>
            <SerieList/>
        </Card>

        <footer>

        </footer>
    </>);
}

export default SeriePanel;