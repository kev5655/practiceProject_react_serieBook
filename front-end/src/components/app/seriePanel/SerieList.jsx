import React, {useState} from "react";

import Serie from "./Serie";
import DetailSerie from "./DetailSerie"

import classes from './SerieList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {uiAction} from "../../../store/ui-slice";


const SerieList = () => {

    const [detailSerie, setDetailSerie] = useState();
    const series = useSelector((state) => state.series.filteredItems)
    const dispatch = useDispatch();


    const onSerieClickHandler = (serie) => {
        dispatch(uiAction.enableBlurSerieList())
        setDetailSerie(serie);
    }

    const onOutSideClickHandler = () => {
        setTimeout(() => {
            setDetailSerie('');
            dispatch(uiAction.disableBlurSerieList())
        }, 250);
    }


    return (
        <>
            {series.map((serie) => (
                <Serie key={serie.id}
                       serie={serie}
                       onClick={onSerieClickHandler}
                />
            ))}
            {
                series.isEmpty &&
                <div className={classes.noSeries}><p>Please add a series via the plus symbol</p></div>
            }
            {detailSerie && <DetailSerie
                serie={detailSerie}
                onClickOutside={onOutSideClickHandler}
            />}
        </>
    );
}

export default SerieList;