import React, {useEffect, useState} from "react";

import SerieList from "../components/app/seriePanel/SerieList";

import './SeriePanel.module.css'
import Card from "../components/ui/Card";
import Header from "../components/app/seriePanel/Header";

import classes from './SeriePanel.module.css'
import FilterAndSort from "../components/app/seriePanel/FilterAndSort";
import {useDispatch, useSelector} from "react-redux";
import {fetchSeries} from "../store/series-action";

const SeriePanel = (props) => {
    const [isFilterActive, setFilterActive] = useState(false);
    const dispatch = useDispatch();
    const access_token = useSelector((state) => state.auth.access_token)

    useEffect(() => {
        dispatch(fetchSeries(access_token))
    }, [dispatch, access_token])


    return (<>
        <Card className={classes.header_card}>
            <Header openAddForm={props.openAddForm}/>
            {/*<FilterAndSort*/}
            {/*    isFilterActive={isFilterActive}*/}
            {/*    serieList={props.serieList}*/}
            {/*    onCompileSeire={onCompileHandler}/>*/}
        </Card>

        <Card className={classes.serieList_card}>
            <SerieList/>
        </Card>

        <footer>

        </footer>
    </>);
}

export default SeriePanel;