import React, {useEffect, useState} from "react";

import SerieList from "./serieList/SerieList";

import './SeriePanel.module.css'
import Card from "../../ui/Card";
import Header from "./header/Header";

import classes from './SeriePanel.module.css'
import FilterAndSort from "./header/FilterAndSort";
import {useDispatch, useSelector} from "react-redux";
import {fetchSeries} from "../../../store/series-action";

const SeriePanel = (props) => {
    const [isFilterActive, setFilterActive] = useState(false);
    const dispatch = useDispatch();
    const access_token = useSelector((state) => state.auth.access_token)

    useEffect(() => {
        dispatch(fetchSeries(access_token))
    }, [dispatch, access_token])


    const onFilterClickHandler = () => {
        setFilterActive(!isFilterActive)
    }

    return (<>

        <Card className={classes.header_card}>
            <Header onFilter={onFilterClickHandler}
                    openAddForm={props.openAddForm}/>
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